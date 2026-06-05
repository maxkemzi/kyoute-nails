import {
	formatPrice,
	isRetryableError,
	parseProductRating,
	withRetry,
} from '../helpers';

describe('formatPrice', () => {
	it('formats EUR correctly', () => {
		expect(formatPrice('30.00', 'EUR')).toBe('€30.00');
	});

	it('formats USD correctly', () => {
		expect(formatPrice('19.99', 'USD')).toBe('$19.99');
	});

	it('formats GBP correctly', () => {
		expect(formatPrice('25.00', 'GBP')).toBe('£25.00');
	});

	it('formats zero correctly', () => {
		expect(formatPrice('0.00', 'EUR')).toBe('€0.00');
	});

	it('formats large amounts correctly', () => {
		expect(formatPrice('1000.00', 'EUR')).toBe('€1,000.00');
	});

	it('rounds to 2 decimal places', () => {
		expect(formatPrice('30.999', 'EUR')).toBe('€31.00');
	});
});

describe('parseProductRating', () => {
	it('parses rating and count correctly', () => {
		const metafields = [
			{
				key: 'rating',
				value: '{"scale_min":"1.0","scale_max":"5.0","value":"4.5"}',
			},
			{key: 'rating_count', value: '10'},
		];
		expect(parseProductRating(metafields)).toEqual({value: 4.5, count: 10});
	});

	it('returns 0 for both when metafields are empty', () => {
		expect(parseProductRating([])).toEqual({value: 0, count: 0});
	});

	it('returns 0 for rating when rating metafield is missing', () => {
		const metafields = [{key: 'rating_count', value: '5'}];
		expect(parseProductRating(metafields)).toEqual({value: 0, count: 5});
	});

	it('returns 0 for count when rating_count metafield is missing', () => {
		const metafields = [
			{
				key: 'rating',
				value: '{"scale_min":"1.0","scale_max":"5.0","value":"4.5"}',
			},
		];
		expect(parseProductRating(metafields)).toEqual({value: 4.5, count: 0});
	});

	it('handles null metafields', () => {
		const metafields = [null, {key: 'rating_count', value: '3'}];
		expect(parseProductRating(metafields)).toEqual({value: 0, count: 3});
	});

	it('handles perfect 5.0 rating', () => {
		const metafields = [
			{
				key: 'rating',
				value: '{"scale_min":"1.0","scale_max":"5.0","value":"5.0"}',
			},
			{key: 'rating_count', value: '1'},
		];
		expect(parseProductRating(metafields)).toEqual({value: 5, count: 1});
	});

	it('ignores unrelated metafields', () => {
		const metafields = [
			{key: 'some_other_field', value: 'something'},
			{
				key: 'rating',
				value: '{"scale_min":"1.0","scale_max":"5.0","value":"3.7"}',
			},
			{key: 'rating_count', value: '42'},
		];
		expect(parseProductRating(metafields)).toEqual({value: 3.7, count: 42});
	});
});

describe('withRetry', () => {
	it('returns result on first success', async () => {
		const fn = jest.fn().mockResolvedValue('success');
		const result = await withRetry(fn, 1);
		expect(result).toBe('success');
		expect(fn).toHaveBeenCalledTimes(1);
	});

	it('retries on retryable error', async () => {
		const fn = jest
			.fn()
			.mockRejectedValueOnce(new Error('conflicted with another request'))
			.mockResolvedValue('success');
		const result = await withRetry(fn, 1);
		expect(result).toBe('success');
		expect(fn).toHaveBeenCalledTimes(2);
	});

	it('throws after exhausting retries', async () => {
		const error = new Error('conflicted with another request');
		const fn = jest.fn().mockRejectedValue(error);
		await expect(withRetry(fn, 1)).rejects.toThrow(
			'conflicted with another request',
		);
		expect(fn).toHaveBeenCalledTimes(2);
	});

	it('does not retry non-retryable errors', async () => {
		const error = new Error('some other error');
		const fn = jest.fn().mockRejectedValue(error);
		await expect(withRetry(fn, 1)).rejects.toThrow('some other error');
		expect(fn).toHaveBeenCalledTimes(1);
	});

	it('does not retry when signal is aborted', async () => {
		const controller = new AbortController();
		controller.abort();
		const error = new Error('conflicted with another request');
		const fn = jest.fn().mockRejectedValue(error);
		await expect(withRetry(fn, 1, controller.signal)).rejects.toThrow();
		expect(fn).toHaveBeenCalledTimes(1);
	});

	it('does not retry when retries is 0', async () => {
		const error = new Error('conflicted with another request');
		const fn = jest.fn().mockRejectedValue(error);
		await expect(withRetry(fn, 0)).rejects.toThrow();
		expect(fn).toHaveBeenCalledTimes(1);
	});
});

describe('isRetryableError', () => {
	it('returns true for conflict error', () => {
		expect(
			isRetryableError(new Error('conflicted with another request')),
		).toBe(true);
	});

	it('returns true for ETIMEDOUT error', () => {
		expect(isRetryableError(new Error('ETIMEDOUT'))).toBe(true);
	});

	it('returns true for TimeoutError', () => {
		const error = new Error('timeout');
		error.name = 'TimeoutError';
		expect(isRetryableError(error)).toBe(true);
	});

	it('returns true for AbortError', () => {
		const error = new Error('aborted');
		error.name = 'AbortError';
		expect(isRetryableError(error)).toBe(true);
	});

	it('returns false for generic error', () => {
		expect(isRetryableError(new Error('something went wrong'))).toBe(false);
	});

	it('returns false for non-Error values', () => {
		expect(isRetryableError('string error')).toBe(false);
		expect(isRetryableError(null)).toBe(false);
		expect(isRetryableError(undefined)).toBe(false);
		expect(isRetryableError(42)).toBe(false);
	});
});
