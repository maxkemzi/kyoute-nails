'use client';

import {ShoppingBag as ShoppingBagIcon} from 'react-feather';
import {Typography} from '../ui';
import {useCart} from '@/lib/shopify/cartContext';

const ShoppingBag = () => {
	const {cart, openCart} = useCart();
	return (
		<button className="relative" onClick={openCart}>
			<ShoppingBagIcon size={24} strokeWidth={1} />
			<div className="absolute left-1/2 top-1/2 w-4 h-4 bg-primary flex items-center justify-center rounded-full">
				<Typography size="xs" color="primaryForeground">
					{cart?.totalQuantity}
				</Typography>
			</div>
		</button>
	);
};

export default ShoppingBag;
