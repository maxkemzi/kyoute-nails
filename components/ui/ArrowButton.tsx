import {ButtonHTMLAttributes} from 'react';
import {ChevronLeft, ChevronRight} from 'react-feather';
import {twMerge} from 'tailwind-merge';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	direction: 'left' | 'right';
}

const ArrowButton = ({className, direction, ...rest}: Props) => {
	return (
		<button
			className={twMerge(
				'group cursor-pointer disabled:cursor-default',
				className,
			)}
			{...rest}
		>
			<span className="w-12 h-12 flex items-center justify-center rounded-full text-background-foreground group-hover:text-primary bg-background/60 group-hover:bg-background/80 transition-colors group-disabled:opacity-30">
				{direction === 'left' ? (
					<ChevronLeft size={24} />
				) : (
					<ChevronRight size={24} />
				)}
			</span>
		</button>
	);
};

export default ArrowButton;
