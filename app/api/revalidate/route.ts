import {env} from '@/config';
import {revalidateTag} from 'next/cache';
import {NextRequest} from 'next/server';

export async function POST(req: NextRequest) {
	const secret = req.headers.get('x-revalidate-secret');

	if (secret !== env.REVALIDATE_SECRET) {
		return new Response('Unauthorized', {status: 401});
	}

	let tag: string | undefined;
	try {
		const body = await req.json();
		tag = body?.tag;
	} catch {}

	if (tag === 'reviews') revalidateTag('reviews', 'max');
	else if (tag === 'products') revalidateTag('products', 'max');
	else {
		revalidateTag('reviews', 'max');
		revalidateTag('products', 'max');
	}

	return Response.json({revalidated: true});
}
