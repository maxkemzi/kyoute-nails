import {ReactNode} from 'react';
import {Typography} from '../Typography';
import {Variant} from './types';
import {twMerge} from 'tailwind-merge';

interface Props {
	children?: ReactNode;
	className?: string;
	variant?: Variant;
	isDisabled?: boolean;
	onClick?: () => void;
}

const Button = (props: Props) => {
	const {children, className, variant = 'solid', isDisabled, onClick} = props;

	return (
		<button
			className={twMerge(
				'shadow-sm py-3.5 px-7 rounded-xl',
				variant === 'solid' && 'bg-primary text-primary-foreground',
				variant === 'outline' &&
					'bg-background border border-background-foreground transition-colors duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground',
				isDisabled && 'bg-disabled text-disabled-foreground',
				className,
			)}
			type="button"
			disabled={isDisabled}
			onClick={onClick}
		>
			<Typography
				as="span"
				weight="semibold"
				textTransform="uppercase"
				color="inherit"
			>
				{children}
			</Typography>
		</button>
	);
};

export default Button;
