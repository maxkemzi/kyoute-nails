import {env} from '@/config';
import {isRetryableError, withRetry} from './helpers';

const isBrowser = typeof window !== 'undefined';
const SHOPIFY_TIMEOUT_MS = 5000;
const SHOPIFY_RETRY_COUNT = 2;

class ShopifyError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'ShopifyError';
	}
}

export async function shopifyFetch<T>(
	query: string,
	variables: Record<string, unknown> = {},
	signal?: AbortSignal,
	retries = SHOPIFY_RETRY_COUNT,
): Promise<T> {
	const domain = env.SHOPIFY_STORE_DOMAIN;
	const token = env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

	const timeout = AbortSignal.timeout(SHOPIFY_TIMEOUT_MS);
	const combinedSignal = signal ? AbortSignal.any([signal, timeout]) : timeout;

	const url = isBrowser
		? '/api/shopify'
		: `https://${domain}/api/2026-04/graphql.json`;

	const response = await withRetry(
		() =>
			fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					...(!isBrowser && {
						'X-Shopify-Storefront-Access-Token': token,
					}),
				},
				body: JSON.stringify({query, variables}),
				signal: combinedSignal,
			}),
		retries,
		combinedSignal,
	);

	if (!response.ok) {
		if (retries > 0 && [502, 503, 504].includes(response.status)) {
			await new Promise(res => setTimeout(res, 300));
			return shopifyFetch(query, variables, signal, retries - 1);
		}
		throw new ShopifyError(`Shopify API error: ${response.status}`);
	}

	const {data, errors}: {data: T; errors?: {message: string}[]} =
		await response.json();

	if (errors?.length) {
		const {message} = errors[0];

		if (retries > 0 && isRetryableError(new Error(message))) {
			await new Promise(res => setTimeout(res, 300));
			return shopifyFetch(query, variables, signal, retries - 1);
		}

		throw new ShopifyError(message);
	}

	return data;
}
