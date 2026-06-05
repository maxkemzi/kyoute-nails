'use client';

import {SelectField} from '@/components/form';
import {AddToCartButton} from '@/components/shop';
import {ShopifyProductOption, ShopifyVariant} from '@/lib/shopify';
import {useState} from 'react';

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
						<SelectField
							key={o.name}
							id={o.name}
							label={o.name}
							className="w-full max-w-85"
							value={selectedOptions[o.name]}
							onChange={value =>
								setSelectedOptions(prev => ({...prev, [o.name]: value}))
							}
							options={o.values.map(v => ({label: v, value: v}))}
						/>
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
