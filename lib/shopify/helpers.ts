export const isRetryableError = (e: unknown) => {
	if (!(e instanceof Error)) return false;

	return (
		e.message.includes('conflicted with another request') || // Shopify conflict
		e.message.includes('ETIMEDOUT') || // Node network timeout
		e.name === 'TimeoutError' || // AbortSignal.timeout
		e.name === 'AbortError' // fetch aborted by timeout
	);
};

export const isAbortError = (e: unknown) =>
	e instanceof Error && (e.name === 'AbortError' || e.name === 'TimeoutError');

export const formatPrice = (amount: string, currencyCode: string): string => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: currencyCode,
	}).format(parseFloat(amount));
};

export const parseProductRating = (
	metafields: ({key: string; value: string} | null)[],
) => {
	const ratingMeta = metafields.find(m => m?.key === 'rating');
	const countMeta = metafields.find(m => m?.key === 'rating_count');

	return {
		value: ratingMeta ? parseFloat(JSON.parse(ratingMeta.value).value) : 0,
		count: countMeta ? parseInt(countMeta.value) : 0,
	};
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
