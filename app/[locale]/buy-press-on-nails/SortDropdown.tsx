'use client';

import {Dropdown, DropdownItem, Typography} from '@/components/ui';
import {useTranslations} from 'next-intl';
import {useRouter, useSearchParams} from 'next/navigation';
import {ChevronDown} from 'react-feather';
import {twMerge} from 'tailwind-merge';

interface Props {
	className?: string;
}

const SortDropdown = ({className}: Props) => {
	const t = useTranslations('BuyPressOnNails.sort');
	const router = useRouter();
	const searchParams = useSearchParams();
	const sort = searchParams.get('sort') ?? 'featured';

	const getLabel = (value: string) => {
		switch (value) {
			case 'price-asc':
				return t('options.priceAsc');
			case 'price-desc':
				return t('options.priceDesc');
			case 'newest':
				return t('options.newest');
			default:
				return t('options.featured');
		}
	};

	const handleSelect = (value: string) => {
		const params = new URLSearchParams(searchParams.toString());

		if (value === 'featured') {
			params.delete('sort');
		} else {
			params.set('sort', value);
		}

		router.push(`?${params.toString()}`);
	};

	return (
		<div className={twMerge('inline-block', className)}>
			<div className="flex items-center gap-7">
				<Typography>{t('label')}:</Typography>
				<Dropdown
					trigger={
						<div className="flex justify-between w-full items-center gap-1.5">
							<Typography as="span" textTransform="capitalize">
								{getLabel(sort)}
							</Typography>
							<ChevronDown size={16} />
						</div>
					}
					value={sort}
				>
					<DropdownItem onSelect={handleSelect} value="featured">
						{getLabel('featured')}
					</DropdownItem>

					<DropdownItem onSelect={handleSelect} value="price-asc">
						{getLabel('price-asc')}
					</DropdownItem>

					<DropdownItem onSelect={handleSelect} value="price-desc">
						{getLabel('price-desc')}
					</DropdownItem>

					<DropdownItem onSelect={handleSelect} value="newest">
						{getLabel('newest')}
					</DropdownItem>
				</Dropdown>
			</div>
		</div>
	);
};

export default SortDropdown;
