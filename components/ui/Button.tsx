import {ReactNode} from 'react';
import Typography from './Typography/Typography';
import {twMerge} from 'tailwind-merge';

interface Props {
	children?: ReactNode;
	className?: string;
	variant?: 'solid' | 'outline';
	isDisabled?: boolean;
	isSubmit?: boolean;
	onClick?: () => void;
}

const Button = (props: Props) => {
	const {
		children,
		className,
		variant = 'solid',
		isDisabled,
		isSubmit,
		onClick,
	} = props;

	return (
		<button
			className={twMerge(
				'py-3.5 px-7 rounded-xl cursor-pointer max-xs:py-2.5 max-xs:px-6',
				variant === 'solid' && 'bg-primary text-primary-foreground',
				variant === 'outline' &&
					'bg-background border border-border transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground',
				isDisabled && 'bg-disabled text-disabled-foreground cursor-default',
				className,
			)}
			type={isSubmit ? 'submit' : 'button'}
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
export type {Props as ButtonProps};
