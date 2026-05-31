'use client';

import {Dropdown, DropdownItem, Typography} from '@/components/ui';
import {useRouter, useSearchParams} from 'next/navigation';
import {ChevronDown} from 'react-feather';
import {twMerge} from 'tailwind-merge';

interface Props {
	className?: string;
}

const labels: Record<string, string> = {
	featured: 'Featured',
	'price-asc': 'Price: Low to High',
	'price-desc': 'Price: High to Low',
	newest: 'Newest',
};

const SortDropdown = ({className}: Props) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const sort = searchParams.get('sort') ?? 'featured';

	const handleSelect = (value: string) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set('sort', value);

		router.push(`?${params.toString()}`);
	};

	return (
		<div className={twMerge('inline-block', className)}>
			<div className="flex items-center gap-7">
				<Typography>Sort by:</Typography>
				<Dropdown
					trigger={
						<button className="flex justify-between w-full items-center gap-1.5">
							<Typography as="span" textTransform="capitalize">
								{labels[sort]}
							</Typography>
							<ChevronDown size={16} />
						</button>
					}
					value={sort}
				>
					<DropdownItem onSelect={handleSelect} value="featured">
						Featured
					</DropdownItem>

					<DropdownItem onSelect={handleSelect} value="price-asc">
						Price: Low to High
					</DropdownItem>

					<DropdownItem onSelect={handleSelect} value="price-desc">
						Price: High to Low
					</DropdownItem>

					<DropdownItem onSelect={handleSelect} value="newest">
						Newest
					</DropdownItem>
				</Dropdown>
			</div>
		</div>
	);
};

export default SortDropdown;
