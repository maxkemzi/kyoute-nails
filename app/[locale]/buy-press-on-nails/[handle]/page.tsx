import {Section} from '@/components/ui';
import {Suspense} from 'react';
import ProductInfo from './ProductInfo';
import ProductInfoSkeleton from './ProductInfoSkeleton';
import {Metadata} from 'next';
import {getProductByHandle} from '@/lib/shopify';
import {getTranslations} from 'next-intl/server';

export async function generateMetadata({
	params,
}: {
	params: Promise<{handle: string; locale: string}>;
}): Promise<Metadata> {
	const {handle, locale} = await params;
	const product = await getProductByHandle(handle, locale);

	if (!product) {
		const tNotFound = await getTranslations({locale, namespace: 'NotFound'});
		return {title: tNotFound('pageNotFound')};
	}

	const t = await getTranslations({locale, namespace: 'PressOnNailsDetails'});
	const {amount, currencyCode} = product.priceRange.minVariantPrice;
	const description = t('meta.description', {
		title: product.title,
		price: `${amount} ${currencyCode}`,
	});
	const image = product.images.edges[0]?.node;

	return {
		title: product.title,
		description,
		openGraph: {
			title: product.title,
			description,
			type: 'website',
			images: image
				? [
						{
							url: image.url,
							width: 1200,
							height: 1500,
							alt: image.altText ?? product.title,
						},
					]
				: [],
		},
	};
}

const PressOnNailsDetails = async ({
	params,
}: {
	params: Promise<{handle: string; locale: string}>;
}) => {
	const {handle, locale} = await params;

	return (
		<Section>
			<div className="container container-md">
				<Suspense fallback={<ProductInfoSkeleton />}>
					<ProductInfo handle={handle} locale={locale} />
				</Suspense>
			</div>
		</Section>
	);
};

export default PressOnNailsDetails;
