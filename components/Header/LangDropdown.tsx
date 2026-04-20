'use client';

import {useChangeLanguage, useT} from 'next-i18next/client';
import {useEffect, useRef, useState} from 'react';
import {ChevronDown} from 'react-feather';
import {Dropdown, DropdownItem, Typography} from '../ui';

const LangDropdown = () => {
	const [langDropdownIsOpen, setLangDropdownIsOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const changeLanguage = useChangeLanguage();
	const {i18n} = useT();

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

	const handleSelectLang = (lng: string) => {
		return () => {
			changeLanguage(lng);
			setLangDropdownIsOpen(false);
		};
	};

	return (
		<div className="relative" ref={ref}>
			<button
				className="flex items-center gap-1"
				onClick={toggleLangDropdownIsOpen}
			>
				<Typography size="sm" textTransform="uppercase">
					{i18n.language}
				</Typography>
				<ChevronDown size={16} />
			</button>
			{langDropdownIsOpen ? (
				<Dropdown className="absolute left-0 top-[calc(100%+6px)]">
					<DropdownItem
						typographyClassName="uppercase"
						onSelect={handleSelectLang('en')}
						isDisabled={i18n.language === 'en'}
					>
						EN
					</DropdownItem>
					<DropdownItem
						typographyClassName="uppercase"
						onSelect={handleSelectLang('ru')}
						isDisabled={i18n.language === 'ru'}
					>
						RU
					</DropdownItem>
				</Dropdown>
			) : null}
		</div>
	);
};

export default LangDropdown;
