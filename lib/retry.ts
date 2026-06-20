const RETRYABLE_HTTP_STATUSES = [502, 503, 504];

class RetryableHttpError extends Error {
	status: number;
	constructor(status: number) {
		super(`Retryable HTTP status: ${status}`);
		this.name = 'RetryableHttpError';
		this.status = status;
	}
}

export const isRetryableError = (e: unknown) => {
	if (!(e instanceof Error)) return false;

	return (
		e.message.includes('conflicted with another request') || // Shopify conflict
		e.message.includes('ETIMEDOUT') || // Node network timeout
		e.name === 'TimeoutError' || // AbortSignal.timeout
		e.name === 'AbortError' || // fetch aborted by timeout
		e.name === 'RetryableHttpError'
	);
};

export const isRetryableResponse = (response: Response): boolean => {
	return RETRYABLE_HTTP_STATUSES.includes(response.status);
};

export const withRetry = async <T>(
	fn: () => Promise<T>,
	retries: number,
	signal?: AbortSignal,
): Promise<T> => {
	try {
		return await fn();
	} catch (e) {
		if (retries > 0 && isRetryableError(e) && !signal?.aborted) {
			await new Promise(res => setTimeout(res, 300));
			return withRetry(fn, retries - 1, signal);
		}
		throw e;
	}
};

export const fetchWithRetry = async (
	fetchFn: () => Promise<Response>,
	retries: number,
	signal?: AbortSignal,
): Promise<Response> => {
	return withRetry(
		async () => {
			const response = await fetchFn();
			if (isRetryableResponse(response)) {
				throw new RetryableHttpError(response.status);
			}
			return response;
		},
		retries,
		signal,
	);
};
