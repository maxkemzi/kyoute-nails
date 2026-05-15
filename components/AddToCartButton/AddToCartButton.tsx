'use client';

import {useCart} from '@/lib/shopify/cartContext';
import {Button} from '../ui';

interface Props {
	className?: string;
	variantId: string;
	availableForSale: boolean;
}

const AddToCartButton = ({className, variantId, availableForSale}: Props) => {
	const {addItem, loadingItems} = useCart();

	if (!availableForSale) {
		return (
			<Button variant="outline" isDisabled>
				Out of stock
			</Button>
		);
	}

	return (
		<Button
			className={className}
			onClick={() => addItem(variantId)}
			isDisabled={loadingItems.has(variantId)}
			variant="outline"
		>
			{loadingItems.has(variantId) ? 'Adding...' : 'Add to cart'}
		</Button>
	);
};

export default AddToCartButton;
