'use client';

import {useLightbox} from '@/lib/lightbox';
import {JudgeMeReview} from '@/lib/reviews';
import {useFormatter, useTranslations} from 'next-intl';
import Image from 'next/image';
import {Check} from 'react-feather';
import {Typography} from '../ui';
import StarRating from './StarRating';

interface Props {
	review: JudgeMeReview;
}

const ReviewCard = ({review}: Props) => {
	const {reviewer, rating, body, title, pictures, verified, created_at} =
		review;
	console.log(review);

	const t = useTranslations('ReviewCard');
	const tLightbox = useTranslations('Lightbox');
	const format = useFormatter();
	const {openLightbox} = useLightbox();

	const lightboxImages = pictures.map(p => ({
		url: p.urls.original,
		altText: t('reviewPhoto'),
	}));

	console.log(verified);

	return (
		<div className="flex flex-col gap-2 p-4 shadow-border rounded-2xl">
			<div className="flex items-center justify-between gap-4">
				<div className="flex items-center gap-2 overflow-hidden">
					<Typography weight="medium" truncate>
						{reviewer.name}
					</Typography>
					{[
						'confirmed-buyer',
						'buyer',
						'verified-purchase',
						'semi-verified-purchase',
						'admin',
					].includes(verified) ? (
						<Typography
							className="flex gap-1 items-center bg-success/15 px-2 py-0.5 rounded-xl"
							color="success"
							variant="body2"
						>
							<Check size={16} />
							<span className="max-xs:hidden">{t('verified')}</span>
						</Typography>
					) : null}
				</div>
				<StarRating
					rating={{
						value: rating,
						count: 0,
					}}
					showCount={false}
				/>
			</div>

			{title ? <Typography weight="medium">{title}</Typography> : null}

			<Typography>{body}</Typography>

			{pictures.length > 0 ? (
				<div className="flex gap-2 overflow-x-auto">
					{pictures.map((pic, index) => (
						<button
							key={index}
							onClick={() => openLightbox(lightboxImages, index)}
							className="relative size-20 rounded-lg overflow-hidden shrink-0 cursor-zoom-in"
							aria-label={tLightbox('openGallery')}
							type="button"
						>
							<Image
								src={pic.urls.small}
								fill
								className="object-cover"
								alt={`${t('reviewPhoto')} ${index + 1}`}
								fetchPriority="high"
								loading="eager"
								sizes="80px"
							/>
						</button>
					))}
				</div>
			) : null}

			<Typography className="text-background-foreground/60" size="sm">
				{format.dateTime(new Date(created_at), {
					day: 'numeric',
					month: 'long',
					year: 'numeric',
				})}
			</Typography>
		</div>
	);
};

export default ReviewCard;
