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

export const localeToShopifyLanguage = (locale: string): string => {
	const map: Record<string, string> = {en: 'EN', ru: 'RU'};
	return map[locale] ?? 'EN';
};
