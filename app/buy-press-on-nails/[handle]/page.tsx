import {AddToCartButton} from '@/components';
import {Section, Typography} from '@/components/ui';
import {formatPrice} from '@/lib/shopify/helpers';
import {getProductByHandle} from '@/lib/shopify/products';
import Image from 'next/image';
import {notFound} from 'next/navigation';

const PressOnNailsDetails = async ({
	params,
}: {
	params: Promise<{handle: string}>;
}) => {
	const {handle} = await params;

	const product = await getProductByHandle(handle);
	if (!product) notFound();

	const {
		title,
		priceRange: {
			minVariantPrice: {amount, currencyCode},
		},
		description,
	} = product;
	const variant = product.variants.edges[0].node;
	const images = product.images.edges.map(({node}) => node);

	return (
		<Section>
			<div className="container container-md">
				<div className="flex gap-16 max-lg:gap-9 max-md:flex-col max-md:gap-7">
					<div className="flex-1 rounded-3xl overflow-hidden">
						<Image
							className="w-full h-auto object-contain"
							width={600}
							height={756}
							src={images[0].url}
							alt={images[0].altText || title}
						/>
					</div>

					<div className="flex-1">
						<Typography className="mb-2" variant="h3">
							{title}
						</Typography>
						<Typography className="mb-7" variant="h4">
							{formatPrice(amount, currencyCode)}
						</Typography>
						<Typography className="mb-9">{description}</Typography>

						<AddToCartButton
							variantId={variant.id}
							availableForSale={variant.availableForSale}
							buttonVariant="solid"
						/>
					</div>
				</div>
			</div>
		</Section>
	);
};

export default PressOnNailsDetails;
