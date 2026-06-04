'use client';

import {AddToCartButton} from '@/components';
import {Dropdown, DropdownItem, Typography} from '@/components/ui';
import {ShopifyProductOption, ShopifyVariant} from '@/lib/shopify/types';
import {useState} from 'react';
import {ChevronDown} from 'react-feather';

interface Props {
	options: ShopifyProductOption[];
	variants: ShopifyVariant[];
}

const VariantSelector = ({options, variants}: Props) => {
	const [selectedOptions, setSelectedOptions] = useState<
		Record<string, string>
	>(Object.fromEntries(options.map(o => [o.name, o.values[0]])));

	const selectedVariant = variants.find(variant =>
		variant.selectedOptions.every(
			({name, value}) => selectedOptions[name] === value,
		),
	);

	const visibleOptions = options.filter(o => o.name !== 'Title');

	return (
		<div className="mb-9">
			{visibleOptions.length !== 0 ? (
				<div className="flex flex-col gap-4 mb-7">
					{visibleOptions.map(o => (
						<div key={o.name} className="flex flex-col gap-2">
							<Typography
								as="label"
								variant="body2"
								textTransform="uppercase"
							>
								{o.name}
							</Typography>
							<Dropdown
								className="w-full max-w-85"
								trigger={
									<button className="flex justify-between items-center gap-1.5 w-full px-4 py-3 border border-border rounded-xl bg-background">
										<Typography as="span" textTransform="capitalize">
											{selectedOptions[o.name]}
										</Typography>
										<ChevronDown size={16} />
									</button>
								}
								value={selectedOptions[o.name]}
							>
								{o.values.map(v => (
									<DropdownItem
										key={v}
										buttonClassName="px-4"
										onSelect={value => {
											setSelectedOptions(prev => ({
												...prev,
												[o.name]: value,
											}));
										}}
										value={v}
									>
										{v}
									</DropdownItem>
								))}
							</Dropdown>
						</div>
					))}
				</div>
			) : null}

			<AddToCartButton
				variantId={selectedVariant?.id ?? ''}
				availableForSale={selectedVariant?.availableForSale ?? false}
				buttonVariant="solid"
			/>
		</div>
	);
};

export default VariantSelector;
