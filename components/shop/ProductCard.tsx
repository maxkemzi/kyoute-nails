import {formatPrice, ShopifyProduct} from '@/lib/shopify';
import Image from 'next/image';
import Link from 'next/link';
import {Typography} from '../ui';

interface Props {
	product: ShopifyProduct;
}

const ProductCard = ({product}: Props) => {
	const {handle, images, title, priceRange} = product;

	const image = images.edges[0]?.node;
	const {amount, currencyCode} = priceRange.minVariantPrice;

	return (
		<Link
			className="relative group flex flex-col h-125 shadow-border rounded-3xl overflow-hidden max-lg:h-112.5 max-md:h-100"
			href={`/buy-press-on-nails/${handle}`}
		>
			<div className="relative grow">
				<Image
					className="object-cover"
					src={image.url}
					fill
					alt={image.altText || title}
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
		</Link>
	);
};

export default ProductCard;
