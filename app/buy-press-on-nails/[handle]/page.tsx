import {ReviewCard, StarRating} from '@/components/shop';
import {Section, Typography} from '@/components/ui';
import {getProductReviews} from '@/lib/reviews';
import {formatPrice, getProductByHandle} from '@/lib/shopify';
import {notFound} from 'next/navigation';
import ImageSlider from './ImageSlider';
import VariantSelector from './VariantSelector';

const PressOnNailsDetails = async ({
	params,
}: {
	params: Promise<{handle: string}>;
}) => {
	const {handle} = await params;

	const product = await getProductByHandle(handle);
	if (!product) notFound();

	const {reviews} = await getProductReviews(handle);

	const {title, description, rating} = product;
	const {amount, currencyCode} = product.priceRange.minVariantPrice;
	const images = product.images.edges.map(({node}) => node);
	const variants = product.variants.edges.map(({node}) => node);

	return (
		<Section>
			<div className="container container-md">
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

						<VariantSelector
							options={product.options}
							variants={variants}
						/>

						<div className="flex flex-col gap-4">
							<div>
								<Typography
									className="mb-2"
									weight="normal"
									variant="h4"
								>
									Description
								</Typography>
								<Typography>{description}</Typography>
							</div>

							<div id="reviews">
								<div className="flex items-center gap-4">
									<Typography weight="normal" variant="h4">
										Reviews
									</Typography>
									{rating.count > 0 ? (
										<StarRating rating={rating} />
									) : null}
								</div>

								{reviews.length === 0 ? (
									<Typography className="mt-2">
										No reviews yet.
									</Typography>
								) : (
									<div className="flex flex-col gap-4 mt-4">
										{reviews.map(r => (
											<ReviewCard key={r.id} review={r} />
										))}
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</Section>
	);
};

export default PressOnNailsDetails;
