import {ReactNode} from 'react';
import {twMerge} from 'tailwind-merge';

interface Props {
	className?: string;
	children: ReactNode;
}

const Section = ({className, children}: Props) => {
	return (
		<section
			className={twMerge('py-20 max-lg:py-16 max-md:py-12', className)}
		>
			{children}
		</section>
	);
};

export default Section;
