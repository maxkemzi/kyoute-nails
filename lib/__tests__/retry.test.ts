// lib/__tests__/retry.test.ts
import {
	isRetryableError,
	isRetryableResponse,
	withRetry,
	fetchWithRetry,
} from '../retry';

const mockResponse = (status: number): Response =>
	({status, ok: status >= 200 && status < 300}) as Response;

describe('isRetryableError', () => {
	it('returns true for Shopify conflict error', () => {
		expect(
			isRetryableError(new Error('conflicted with another request')),
		).toBe(true);
	});

	it('returns true for ETIMEDOUT error', () => {
		expect(isRetryableError(new Error('connect ETIMEDOUT 1.2.3.4'))).toBe(
			true,
		);
	});

	it('returns true for TimeoutError by name', () => {
		const error = new Error('timed out');
		error.name = 'TimeoutError';
		expect(isRetryableError(error)).toBe(true);
	});

	it('returns true for AbortError by name', () => {
		const error = new Error('aborted');
		error.name = 'AbortError';
		expect(isRetryableError(error)).toBe(true);
	});

	it('returns true for RetryableHttpError by name', () => {
		const error = new Error('Retryable HTTP status: 502');
		error.name = 'RetryableHttpError';
		expect(isRetryableError(error)).toBe(true);
	});

	it('returns false for a generic error', () => {
		expect(
			isRetryableError(new Error('something unrelated went wrong')),
		).toBe(false);
	});

	it('returns false for non-Error values', () => {
		expect(isRetryableError('string error')).toBe(false);
		expect(isRetryableError(null)).toBe(false);
		expect(isRetryableError(undefined)).toBe(false);
		expect(isRetryableError(42)).toBe(false);
	});
});

describe('isRetryableResponse', () => {
	it('returns true for 502', () => {
		expect(isRetryableResponse(mockResponse(502))).toBe(true);
	});

	it('returns true for 503', () => {
		expect(isRetryableResponse(mockResponse(503))).toBe(true);
	});

	it('returns true for 504', () => {
		expect(isRetryableResponse(mockResponse(504))).toBe(true);
	});

	it('returns false for 200', () => {
		expect(isRetryableResponse(mockResponse(200))).toBe(false);
	});

	it('returns false for 404', () => {
		expect(isRetryableResponse(mockResponse(404))).toBe(false);
	});

	it('returns false for 500 (not in the retryable list)', () => {
		expect(isRetryableResponse(mockResponse(500))).toBe(false);
	});
});

describe('withRetry', () => {
	it('returns result on first success without retrying', async () => {
		const fn = jest.fn().mockResolvedValue('success');
		const result = await withRetry(fn, 2);
		expect(result).toBe('success');
		expect(fn).toHaveBeenCalledTimes(1);
	});

	it('retries once on a retryable error then succeeds', async () => {
		const fn = jest
			.fn()
			.mockRejectedValueOnce(new Error('conflicted with another request'))
			.mockResolvedValue('success');
		const result = await withRetry(fn, 1);
		expect(result).toBe('success');
		expect(fn).toHaveBeenCalledTimes(2);
	});

	it('throws after exhausting all retries on a retryable error', async () => {
		const error = new Error('ETIMEDOUT');
		const fn = jest.fn().mockRejectedValue(error);
		await expect(withRetry(fn, 2)).rejects.toThrow('ETIMEDOUT');
		expect(fn).toHaveBeenCalledTimes(3); // initial + 2 retries
	});

	it('does not retry a non-retryable error', async () => {
		const error = new Error('totally unrelated failure');
		const fn = jest.fn().mockRejectedValue(error);
		await expect(withRetry(fn, 2)).rejects.toThrow(
			'totally unrelated failure',
		);
		expect(fn).toHaveBeenCalledTimes(1);
	});

	it('does not retry when retries is 0', async () => {
		const error = new Error('conflicted with another request');
		const fn = jest.fn().mockRejectedValue(error);
		await expect(withRetry(fn, 0)).rejects.toThrow();
		expect(fn).toHaveBeenCalledTimes(1);
	});

	it('does not retry when signal is already aborted', async () => {
		const controller = new AbortController();
		controller.abort();
		const error = new Error('conflicted with another request');
		const fn = jest.fn().mockRejectedValue(error);
		await expect(withRetry(fn, 2, controller.signal)).rejects.toThrow();
		expect(fn).toHaveBeenCalledTimes(1);
	});
});

describe('fetchWithRetry', () => {
	it('returns response immediately on a successful status', async () => {
		const fetchFn = jest.fn().mockResolvedValue(mockResponse(200));
		const response = await fetchWithRetry(fetchFn, 2);
		expect(response.status).toBe(200);
		expect(fetchFn).toHaveBeenCalledTimes(1);
	});

	it('retries on a 502 and succeeds on the next attempt', async () => {
		const fetchFn = jest
			.fn()
			.mockResolvedValueOnce(mockResponse(502))
			.mockResolvedValueOnce(mockResponse(200));
		const response = await fetchWithRetry(fetchFn, 1);
		expect(response.status).toBe(200);
		expect(fetchFn).toHaveBeenCalledTimes(2);
	});

	it('retries on 503 and 504 the same way as 502', async () => {
		const fetchFn = jest
			.fn()
			.mockResolvedValueOnce(mockResponse(503))
			.mockResolvedValueOnce(mockResponse(504))
			.mockResolvedValueOnce(mockResponse(200));
		const response = await fetchWithRetry(fetchFn, 2);
		expect(response.status).toBe(200);
		expect(fetchFn).toHaveBeenCalledTimes(3);
	});

	it('does not retry a non-retryable bad status like 404', async () => {
		const fetchFn = jest.fn().mockResolvedValue(mockResponse(404));
		const response = await fetchWithRetry(fetchFn, 2);
		expect(response.status).toBe(404);
		expect(fetchFn).toHaveBeenCalledTimes(1);
	});

	it('throws once retries are exhausted on a persistently bad status', async () => {
		const fetchFn = jest.fn().mockResolvedValue(mockResponse(502));
		await expect(fetchWithRetry(fetchFn, 2)).rejects.toThrow(
			'Retryable HTTP status: 502',
		);
		expect(fetchFn).toHaveBeenCalledTimes(3); // initial + 2 retries
	});

	it('throws immediately when retries is 0 and status is retryable', async () => {
		const fetchFn = jest.fn().mockResolvedValue(mockResponse(503));
		await expect(fetchWithRetry(fetchFn, 0)).rejects.toThrow(
			'Retryable HTTP status: 503',
		);
		expect(fetchFn).toHaveBeenCalledTimes(1);
	});

	it('stops retrying once the signal is aborted mid-flight', async () => {
		const controller = new AbortController();
		const fetchFn = jest.fn().mockImplementation(async () => {
			controller.abort();
			return mockResponse(502);
		});
		await expect(
			fetchWithRetry(fetchFn, 2, controller.signal),
		).rejects.toThrow();
		expect(fetchFn).toHaveBeenCalledTimes(1);
	});
});
