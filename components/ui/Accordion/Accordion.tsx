'use client';

import {Typography} from '@/components/ui';
import {ReactNode, useState} from 'react';
import {ChevronDown} from 'react-feather';
import {twMerge} from 'tailwind-merge';

interface Props {
	title: string;
	children: ReactNode;
}

const Accordion = ({title, children}: Props) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleIsOpen = () => setIsOpen(prev => !prev);

	return (
		<div className="shadow-border rounded-2xl">
			<button
				className="flex items-center justify-between p-4 gap-2 w-full text-left"
				onClick={toggleIsOpen}
				type="button"
			>
				<Typography color="inherit" variant="h4" as="span">
					{title}
				</Typography>
				<ChevronDown
					className={twMerge(
						'transition-transform shrink-0',
						isOpen && 'rotate-180',
					)}
					size={24}
				/>
			</button>
			<div
				className={twMerge(
					'grid transition-all',
					isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
				)}
			>
				<div className="overflow-hidden">
					<div className="px-4 pb-4">{children}</div>
				</div>
			</div>
		</div>
	);
};

export default Accordion;
