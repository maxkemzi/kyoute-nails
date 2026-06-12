'use client';

import {usePathname, useRouter} from '@/app/i18n/navigation';
import {routing} from '@/app/i18n/routing';
import {Dropdown, DropdownItem, Typography} from '@/components/ui';
import {useLocale} from 'next-intl';
import {ChevronDown} from 'react-feather';

const LangDropdown = () => {
	const locale = useLocale();
	const pathname = usePathname();
	const router = useRouter();

	const switchLocale = (locale: string) => {
		router.replace(pathname, {locale});
	};

	return (
		<Dropdown
			trigger={
				<div className="flex items-center gap-1">
					<Typography size="sm" textTransform="uppercase">
						{locale}
					</Typography>
					<ChevronDown size={16} />
				</div>
			}
			value={locale}
		>
			{routing.locales.map(l => (
				<DropdownItem
					key={l}
					typographyClassName="text-sm uppercase"
					onSelect={() => switchLocale(l)}
					value={l}
				>
					{l}
				</DropdownItem>
			))}
		</Dropdown>
	);
};

export default LangDropdown;
