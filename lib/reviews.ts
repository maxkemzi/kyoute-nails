'use server';

import {env} from '@/config';
import {unstable_cache} from 'next/cache';
import {fetchWithRetry} from './retry';

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

const API_TOKEN = env.JUDGEME_PRIVATE_API_TOKEN;
const RETRY_COUNT = 2;
const EMPTY_REVIEWS: JudgeMeResponse = {
	reviews: [],
	per_page: 0,
	current_page: 1,
};

const getJudgeMeProductId = async (handle: string): Promise<number | null> => {
	const response = await fetchWithRetry(
		() =>
			fetch(
				`https://api.judge.me/api/v1/products/-1?shop_domain=${env.SHOPIFY_STORE_DOMAIN}&handle=${handle}`,
				{
					headers: {'X-Api-Token': API_TOKEN},
					next: {revalidate: 24 * 3600},
				},
			),
		RETRY_COUNT,
	);

	if (!response.ok) return null;
	const data = await response.json();
	return data.product?.id ?? null;
};

export const getProductReviews = unstable_cache(
	async (handle: string): Promise<JudgeMeResponse> => {
		const id = await getJudgeMeProductId(handle);

		const response = await fetchWithRetry(
			() =>
				fetch(
					`https://api.judge.me/api/v1/reviews?shop_domain=${env.SHOPIFY_STORE_DOMAIN}&product_id=${id}&per_page=10`,
					{headers: {'X-Api-Token': API_TOKEN}, next: {revalidate: 3600}},
				),
			RETRY_COUNT,
		);

		if (!response.ok) throw new Error('Failed to fetch reviews');
		return response.json();
	},
	['product-reviews'],
	{revalidate: 3600, tags: ['reviews']},
);

export const getProductReviewsSafe = async (
	handle: string,
): Promise<JudgeMeResponse> => {
	try {
		return await getProductReviews(handle);
	} catch (e) {
		console.error('Failed to fetch reviews for', handle, e);
		return EMPTY_REVIEWS;
	}
};
