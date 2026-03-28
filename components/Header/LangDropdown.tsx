'use client';

import {ChevronDown} from 'react-feather';
import {Dropdown, DropdownItem, Typography} from '../ui';
import {useEffect, useRef, useState} from 'react';

const LangDropdown = () => {
	const [langDropdownIsOpen, setLangDropdownIsOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	const toggleLangDropdownIsOpen = () => setLangDropdownIsOpen(prev => !prev);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (!ref.current) return;

			if (!ref.current.contains(e.target as Node)) {
				setLangDropdownIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className="relative" ref={ref}>
			<button
				className="flex items-center gap-1"
				onClick={toggleLangDropdownIsOpen}
			>
				<Typography>EN</Typography>
				<ChevronDown size={16} />
			</button>
			{langDropdownIsOpen ? (
				<Dropdown className="absolute left-0 top-[calc(100%+6px)]">
					<DropdownItem>EN</DropdownItem>
					<DropdownItem>RU</DropdownItem>
				</Dropdown>
			) : null}
		</div>
	);
};

export default LangDropdown;
