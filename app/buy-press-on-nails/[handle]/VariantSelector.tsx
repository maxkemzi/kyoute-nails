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

	return (
		<div className="mb-9">
			<div className="flex flex-col gap-4 mb-7">
				{options.map(o => (
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

			<AddToCartButton
				variantId={selectedVariant?.id ?? ''}
				availableForSale={selectedVariant?.availableForSale ?? false}
				buttonVariant="solid"
			/>
		</div>
	);
};

export default VariantSelector;
