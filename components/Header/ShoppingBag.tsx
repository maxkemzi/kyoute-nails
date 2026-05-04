'use client';

import {ShoppingBag as ShoppingBagIcon} from 'react-feather';
import {Typography} from '../ui';
import {useCart} from '@/lib/shopify/cartContext';

const ShoppingBag = () => {
	const {cart} = useCart();
	return (
		<button className="relative">
			<ShoppingBagIcon size={24} strokeWidth={1} />
			<div className="absolute left-1/2 top-1/2 w-4 h-4 bg-primary flex items-center justify-center rounded-full shadow-sm">
				<Typography size="xs" color="primaryForeground">
					{cart?.totalQuantity}
				</Typography>
			</div>
		</button>
	);
};

export default ShoppingBag;
