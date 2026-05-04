'use client';

import {useCart} from '@/lib/shopify/cartContext';
import {Button} from '../ui';

interface Props {
	variantId: string;
	availableForSale: boolean;
}

const AddToCartButton = ({variantId, availableForSale}: Props) => {
	const {addItem, isLoading} = useCart();

	if (!availableForSale) {
		return (
			<Button variant="outline" isDisabled>
				Out of stock
			</Button>
		);
	}

	return (
		<Button
			onClick={() => addItem(variantId)}
			isDisabled={isLoading}
			variant="outline"
		>
			{isLoading ? 'Adding...' : 'Add to cart'}
		</Button>
	);
};

export default AddToCartButton;
