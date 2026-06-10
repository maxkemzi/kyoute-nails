'use client';

import {useLightbox} from '@/lib/lightbox';
import {JudgeMeReview} from '@/lib/reviews';
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

	const {openLightbox} = useLightbox();

	const lightboxImages = pictures.map(p => ({
		url: p.urls.original,
		altText: 'Review photo',
	}));

	return (
		<div className="flex flex-col gap-2 p-4 shadow-border rounded-2xl">
			<div className="flex items-center justify-between gap-4">
				<div className="flex items-center gap-2 overflow-hidden">
					<Typography weight="medium" truncate>
						{reviewer.name}
					</Typography>
					{verified === 'buyer' ? (
						<Typography
							className="flex gap-1 items-center bg-success/15 px-2 py-0.5 rounded-xl"
							color="success"
							variant="body2"
						>
							<Check size={16} />
							Verified
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
						<div
							key={index}
							onClick={() => openLightbox(lightboxImages, index)}
							className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 cursor-zoom-in"
						>
							<Image
								src={pic.urls.small}
								fill
								className="object-cover"
								alt={`Review photo ${index + 1}`}
								fetchPriority="high"
								loading="eager"
							/>
						</div>
					))}
				</div>
			) : null}

			<Typography className="text-background-foreground/60" size="sm">
				{new Date(created_at).toLocaleDateString('en-GB', {
					day: 'numeric',
					month: 'long',
					year: 'numeric',
				})}
			</Typography>
		</div>
	);
};

export default ReviewCard;
