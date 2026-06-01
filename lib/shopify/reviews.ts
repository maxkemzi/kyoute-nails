export interface JudgeMeReview {
	id: number;
	title: string;
	body: string;
	rating: number;
	reviewer: {
		name: string;
	};
	verified: string;
	pictures: {urls: {original: string; small: string}}[];
	created_at: string;
}

export interface JudgeMeResponse {
	reviews: JudgeMeReview[];
	per_page: number;
	current_page: number;
}

const API_TOKEN = process.env.JUDGEME_PRIVATE_API_TOKEN as string;

const getJudgeMeProductId = async (handle: string): Promise<number | null> => {
	const response = await fetch(
		`https://api.judge.me/api/v1/products/-1?shop_domain=${process.env.SHOPIFY_STORE_DOMAIN}&handle=${handle}`,
		{
			headers: {'X-Api-Token': API_TOKEN},
			next: {revalidate: 24 * 3600},
		},
	);

	if (!response.ok) return null;

	const data = await response.json();
	return data.product?.id ?? null;
};

export const getProductReviews = async (
	handle: string,
): Promise<JudgeMeResponse> => {
	const id = await getJudgeMeProductId(handle);

	const response = await fetch(
		`https://api.judge.me/api/v1/reviews?shop_domain=${process.env.SHOPIFY_STORE_DOMAIN}&product_id=${id}&per_page=10`,
		{headers: {'X-Api-Token': API_TOKEN}, next: {revalidate: 3600}},
	);

	if (!response.ok) throw new Error('Failed to fetch reviews');

	return response.json();
};
