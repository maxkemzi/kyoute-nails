'use client';

import {useChangeLanguage, useT} from 'next-i18next/client';
import {ChevronDown} from 'react-feather';
import {Dropdown, DropdownItem, Typography} from '../ui';

const LangDropdown = () => {
	const changeLanguage = useChangeLanguage();
	const {i18n} = useT();

	return (
		<Dropdown
			trigger={
				<button className="flex items-center gap-1">
					<Typography size="sm" textTransform="uppercase">
						{i18n.language}
					</Typography>
					<ChevronDown size={16} />
				</button>
			}
			value={i18n.language}
		>
			<DropdownItem
				typographyClassName="text-sm uppercase"
				onSelect={changeLanguage}
				value="en"
			>
				EN
			</DropdownItem>
			<DropdownItem
				typographyClassName="text-sm uppercase"
				onSelect={changeLanguage}
				value="ru"
			>
				RU
			</DropdownItem>
		</Dropdown>
	);
};

export default LangDropdown;
