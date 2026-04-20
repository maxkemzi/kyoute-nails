'use client';

import {Dropdown, DropdownItem, Typography} from '@/components/ui';
import {useEffect, useRef, useState} from 'react';
import {ChevronDown} from 'react-feather';
import {twMerge} from 'tailwind-merge';

interface Props {
	className?: string;
}

const SortDropdown = ({className}: Props) => {
	const [isOpen, setIsOpen] = useState(false);
	const [value, setValue] = useState('popularity');
	const ref = useRef<HTMLDivElement>(null);

	const toggleIsOpen = () => setIsOpen(prev => !prev);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (!ref.current) return;

			if (!ref.current.contains(e.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const handleSelect = (value: string) => {
		return () => {
			setValue(value);
			setIsOpen(false);
		};
	};

	return (
		<div className={twMerge('inline-block', className)} ref={ref}>
			<div className="flex items-center gap-7">
				<Typography>Sort by:</Typography>
				<div className="relative">
					<button
						className="flex items-center gap-1.5"
						onClick={toggleIsOpen}
					>
						<Typography as="span" textTransform="capitalize">
							{value}
						</Typography>
						<ChevronDown size={16} />
					</button>

					{isOpen ? (
						<Dropdown className="absolute left-0 top-[calc(100%+6px)] z-10">
							<DropdownItem
								onSelect={handleSelect('popularity')}
								isDisabled={value === 'popularity'}
							>
								Popularity
							</DropdownItem>
						</Dropdown>
					) : null}
				</div>
			</div>
		</div>
	);
};

export default SortDropdown;
