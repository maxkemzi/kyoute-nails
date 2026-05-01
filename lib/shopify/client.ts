export async function shopifyFetch<T>(
	query: string,
	variables: Record<string, unknown> = {},
): Promise<T> {
	const domain = process.env.SHOPIFY_STORE_DOMAIN as string;
	const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN as string;

	const response = await fetch(`https://${domain}/api/2026-04/graphql.json`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-Shopify-Storefront-Access-Token': token,
		},
		body: JSON.stringify({query, variables}),
		next: {revalidate: 60},
	});

	if (!response.ok) {
		throw new Error(`Shopify API error: ${response.status}`);
	}

	const {data, errors}: {data: T; errors?: {message: string}[]} =
		await response.json();

	if (errors?.length) throw new Error(errors[0].message);

	return data;
}
