import {formatPrice, ShopifyProduct} from '@/lib/shopify';
import Image from 'next/image';
import NavigationLink from '../NavigationLink';
import {Typography} from '../ui';

interface Props {
	product: ShopifyProduct;
}

const ProductCard = ({product}: Props) => {
	const {handle, images, title, priceRange} = product;

	const image = images.edges[0]?.node;
	const {amount, currencyCode} = priceRange.minVariantPrice;

	return (
		<NavigationLink
			className="relative group flex flex-col h-125 shadow-border rounded-3xl overflow-hidden max-lg:h-112.5 max-md:h-100"
			href={`/buy-press-on-nails/${handle}`}
		>
			<div className="relative grow">
				<Image
					className="object-cover"
					src={image.url}
					fill
					alt={image.altText || title}
					sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
					fetchPriority="high"
					loading="eager"
				/>
			</div>
			<div className="shrink-0 text-center bg-background py-3 px-4">
				<Typography
					className="mb-1"
					weight="medium"
					variant="h4"
					as="h3"
					truncate
				>
					{title}
				</Typography>
				<Typography weight="semibold" truncate>
					{formatPrice(amount, currencyCode)}
				</Typography>
			</div>
		</NavigationLink>
	);
};

export default ProductCard;
