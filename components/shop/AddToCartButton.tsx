'use client';

import {useCart} from '@/lib/cart/cartContext';
import {useTranslations} from 'next-intl';
import {Button, ButtonProps} from '../ui';

interface Props {
	className?: string;
	variantId: string;
	availableForSale: boolean;
	buttonVariant?: ButtonProps['variant'];
}

const AddToCartButton = (props: Props) => {
	const {
		className,
		variantId,
		availableForSale,
		buttonVariant = 'outline',
	} = props;

	const t = useTranslations('AddToCartButton');
	const {addItem, loadingItems} = useCart();

	if (!availableForSale) {
		return (
			<Button className={className} isDisabled>
				{t('outOfStock')}
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
			{t('addToCart')}
		</Button>
	);
};

export default AddToCartButton;
