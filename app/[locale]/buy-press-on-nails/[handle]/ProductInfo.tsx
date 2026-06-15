import {StarRating} from '@/components/shop';
import {Typography} from '@/components/ui';
import {formatPrice, getProductByHandle} from '@/lib/shopify';
import {getTranslations} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {Suspense} from 'react';
import ImageSlider from './ImageSlider';
import ReviewsSection from './ReviewsSection';
import VariantSelector from './VariantSelector';
import ReviewsSectionSkeleton from './ReviewsSectionSkeleton';

const ProductInfo = async ({
	handle,
	locale,
}: {
	handle: string;
	locale: string;
}) => {
	const product = await getProductByHandle(handle, locale);
	if (!product) notFound();

	const t = await getTranslations('PressOnNailsDetails');

	const {title, description, rating} = product;
	const {amount, currencyCode} = product.priceRange.minVariantPrice;
	const images = product.images.edges.map(({node}) => node);
	const variants = product.variants.edges.map(({node}) => node);

	return (
		<div className="flex gap-16 max-lg:gap-9 max-md:flex-col max-md:gap-7">
			<div className="flex-1 min-w-0 overflow-hidden">
				<ImageSlider images={images} title={title} />
			</div>

			<div className="flex-1">
				<div className="flex justify-between flex-wrap gap-2 mb-2">
					<Typography variant="h3">{title}</Typography>

					{rating.count > 0 ? (
						<a href="#reviews" className="self-end">
							<StarRating rating={rating} variant="compact" />
						</a>
					) : null}
				</div>

				<Typography className="mb-7" variant="h4">
					{formatPrice(amount, currencyCode)}
				</Typography>

				<VariantSelector options={product.options} variants={variants} />

				<div className="flex flex-col gap-4">
					<div>
						<Typography className="mb-2" weight="normal" variant="h4">
							{t('description')}
						</Typography>
						<Typography>{description}</Typography>
					</div>

					<div id="reviews">
						<Suspense fallback={<ReviewsSectionSkeleton />}>
							<ReviewsSection handle={handle} rating={rating} />
						</Suspense>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductInfo;
