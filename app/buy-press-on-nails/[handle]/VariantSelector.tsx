'use client';

import {AddToCartButton} from '@/components';
import {SelectField} from '@/components/form';
import {ShopifyProductOption, ShopifyVariant} from '@/lib/shopify/types';
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
							id={o.name.toLowerCase()}
							label={o.name}
							value={selectedOptions[o.name]}
							onChange={e =>
								setSelectedOptions(prev => ({
									...prev,
									[o.name]: e.target.value,
								}))
							}
							options={o.values.map(value => ({
								label: value,
								value,
							}))}
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
