'use client';

import {useCart} from '@/lib/shopify/cartContext';
import {Button, ButtonVariant} from '../ui';

interface Props {
	className?: string;
	variantId: string;
	availableForSale: boolean;
	buttonVariant?: ButtonVariant;
}

const AddToCartButton = (props: Props) => {
	const {
		className,
		variantId,
		availableForSale,
		buttonVariant = 'outline',
	} = props;

	const {addItem, loadingItems} = useCart();

	if (!availableForSale) {
		return (
			<Button className={className} isDisabled>
				Out of stock
			</Button>
		);
	}

	return (
		<Button
			className={className}
			onClick={() => addItem(variantId)}
			isDisabled={loadingItems.has(variantId)}
			variant={buttonVariant}
		>
			Add to cart
		</Button>
	);
};

export default AddToCartButton;
