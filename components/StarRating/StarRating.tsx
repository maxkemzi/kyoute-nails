import {Typography} from '@/components/ui';
import {ShopifyProduct} from '@/lib/shopify/types';
import {Star} from 'react-feather';
import {twMerge} from 'tailwind-merge';

interface Props {
	className?: string;
	rating: ShopifyProduct['rating'];
	variant?: 'compact' | 'full';
	showCount?: boolean;
}

const StarRating = ({
	className,
	rating,
	variant = 'full',
	showCount = true,
}: Props) => {
	const {value, count} = rating;

	if (variant === 'compact') {
		return (
			<div className={twMerge('flex items-center gap-1.5', className)}>
				<Star
					size={16}
					color="var(--color-primary)"
					fill="var(--color-primary)"
				/>
				<Typography weight="medium">{value.toFixed(1)}</Typography>
				{showCount ? (
					<Typography className="text-background-foreground/60">
						({count})
					</Typography>
				) : null}
			</div>
		);
	}

	return (
		<div className={twMerge('flex items-center gap-1.5', className)}>
			<div className="flex items-center gap-0.5">
				{[1, 2, 3, 4, 5].map(star => (
					<Star
						key={star}
						size={16}
						color="var(--color-primary)"
						fill={
							star <= Math.round(value)
								? 'var(--color-primary)'
								: 'transparent'
						}
					/>
				))}
			</div>
			{showCount ? (
				<Typography className="text-background-foreground/60">
					({count} {count === 1 ? 'review' : 'reviews'})
				</Typography>
			) : null}
		</div>
	);
};

export default StarRating;
