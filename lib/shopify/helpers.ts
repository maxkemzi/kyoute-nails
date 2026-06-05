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

export function formatPrice(amount: string, currencyCode: string): string {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: currencyCode,
	}).format(parseFloat(amount));
}
