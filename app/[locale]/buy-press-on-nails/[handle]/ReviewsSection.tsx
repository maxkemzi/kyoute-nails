import {StarRating, ReviewCard} from '@/components/shop';
import {Typography} from '@/components/ui';
import {getProductReviews} from '@/lib/reviews';
import {ShopifyProduct} from '@/lib/shopify';
import {getTranslations} from 'next-intl/server';

interface Props {
	handle: string;
	rating: ShopifyProduct['rating'];
}

const ReviewsSection = async ({handle, rating}: Props) => {
	const {reviews} = await getProductReviews(handle);

	const t = await getTranslations('PressOnNailsDetails');

	return (
		<div>
			<div className="flex items-center gap-4">
				<Typography weight="normal" variant="h4">
					{t('reviews.title')}
				</Typography>
				{rating.count > 0 ? <StarRating rating={rating} /> : null}
			</div>

			{reviews.length === 0 ? (
				<Typography className="mt-2">{t('reviews.noReviews')}</Typography>
			) : (
				<div className="flex flex-col gap-4 mt-4">
					{reviews.map(r => (
						<ReviewCard key={r.id} review={r} />
					))}
				</div>
			)}
		</div>
	);
};

export default ReviewsSection;
