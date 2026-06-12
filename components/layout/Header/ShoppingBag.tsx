'use client';

import {Typography} from '@/components/ui';
import {useCart} from '@/lib/cart';
import {useTranslations} from 'next-intl';
import {ShoppingBag as ShoppingBagIcon} from 'react-feather';

const ShoppingBag = () => {
	const t = useTranslations('CartSidebar');
	const {cart, openCart, isInitializing} = useCart();

	return (
		<button
			className="relative cursor-pointer"
			onClick={openCart}
			aria-label={t('openCart')}
		>
			<ShoppingBagIcon size={24} strokeWidth={1} />
			{isInitializing ? (
				<div className="absolute left-1/2 top-1/2 w-4 h-4 bg-surface animate-pulse rounded-full" />
			) : null}
			{!isInitializing && cart ? (
				<div className="absolute left-1/2 top-1/2 w-4.25 h-4.25 bg-primary flex items-center justify-center rounded-full">
					<Typography size="xs" color="primaryForeground">
						{cart?.totalQuantity}
					</Typography>
				</div>
			) : null}
		</button>
	);
};

export default ShoppingBag;
