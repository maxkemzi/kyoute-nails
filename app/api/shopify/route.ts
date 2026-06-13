import {env} from '@/config';
import {NextRequest, NextResponse} from 'next/server';

const domain = env.SHOPIFY_STORE_DOMAIN!;
const token = env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

export async function POST(req: NextRequest) {
	const {query, variables} = await req.json();

	try {
		const response = await fetch(
			`https://${domain}/api/2026-04/graphql.json`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-Shopify-Storefront-Access-Token': token,
				},
				body: JSON.stringify({query, variables}),
			},
		);

		const data = await response.json();
		return NextResponse.json(data);
	} catch {
		return NextResponse.json(
			{errors: [{message: 'Failed to reach Shopify'}]},
			{status: 502},
		);
	}
}
