import {ReactNode} from 'react';
import {twMerge} from 'tailwind-merge';

interface Props {
	children?: ReactNode;
	className?: string;
}

const Dropdown = ({children, className}: Props) => {
	return (
		<ul
			className={twMerge(
				'w-full shadow-md bg-background rounded-lg py-1',
				className,
			)}
		>
			{children}
		</ul>
	);
};

export default Dropdown;
