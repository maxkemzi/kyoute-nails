const isBrowser = typeof window !== 'undefined';

const SHOPIFY_TIMEOUT_MS = 5000;

export async function shopifyFetch<T>(
	query: string,
	variables: Record<string, unknown> = {},
	signal?: AbortSignal,
): Promise<T> {
	const domain = process.env.SHOPIFY_STORE_DOMAIN as string;
	const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN as string;

	const timeout = AbortSignal.timeout(SHOPIFY_TIMEOUT_MS);
	const combinedSignal = signal ? AbortSignal.any([signal, timeout]) : timeout;

	const url = isBrowser
		? '/api/shopify'
		: `https://${domain}/api/2026-04/graphql.json`;

	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			...(!isBrowser && {'X-Shopify-Storefront-Access-Token': token}),
		},
		body: JSON.stringify({query, variables}),
		signal: combinedSignal,
	});

	if (!response.ok) {
		throw new Error(`Shopify API error: ${response.status}`);
	}

	const {data, errors}: {data: T; errors?: {message: string}[]} =
		await response.json();

	if (errors?.length) throw new Error(errors[0].message);

	return data;
}
