import {ShopifyProduct} from '@/lib/shopify/types';
import {formatPrice} from '@/lib/shopify/utils';
import Image from 'next/image';
import Link from 'next/link';
import {AddToCartButton} from '../AddToCartButton';
import {Typography} from '../ui';

interface Props {
	product: ShopifyProduct;
}

const NailsCard = ({product}: Props) => {
	const {handle, variants, images, title, priceRange} = product;

	const image = images.edges[0]?.node;
	const variant = variants.edges[0].node;
	const {amount, currencyCode} = priceRange.minVariantPrice;

	return (
		<div className="relative group flex flex-col h-125 shadow-sm rounded-3xl overflow-hidden">
			<div className="relative grow">
				<Image
					src={image.url}
					fill
					objectFit="cover"
					alt={image.altText || title}
				/>
				<div className="absolute inset-0 bg-background-foreground/35 flex items-center justify-center transition-opacity opacity-0 group-hover:opacity-100">
					<AddToCartButton
						className="z-10"
						variantId={variant.id}
						availableForSale={variant.availableForSale}
					/>
				</div>
			</div>
			<div className="shrink-0 text-center bg-background py-3 px-4">
				<Typography className="mb-1" weight="medium" variant="h4">
					{title}
				</Typography>
				<Typography weight="semibold">
					{formatPrice(amount, currencyCode)}
				</Typography>
			</div>

			<Link
				className="absolute inset-0"
				href={`/buy-press-on-nails/${handle}`}
			/>
		</div>
	);
};

export default NailsCard;
