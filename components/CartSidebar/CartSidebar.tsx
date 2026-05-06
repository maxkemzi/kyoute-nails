'use client';

import {useCart} from '@/lib/shopify/cartContext';
import Image from 'next/image';
import {Lock, Minus, Plus, Trash, X} from 'react-feather';
import {twJoin} from 'tailwind-merge';
import {Button, Typography} from '../ui';
import {useEffect} from 'react';

const CartSidebar = () => {
	const {isOpen, closeCart} = useCart();

	useEffect(() => {
		document.body.style.overflow = isOpen ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	}, [isOpen]);

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') closeCart();
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [closeCart]);

	return (
		<>
			<div
				onClick={closeCart}
				className={twJoin(
					'fixed inset-0 bg-black/20 z-40 transition-opacity duration-300',
					isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
				)}
			/>
			<aside
				className={twJoin(
					'fixed right-0 top-0 bottom-0 z-50 max-w-90 w-full flex flex-col bg-background transition-transform duration-300',
					isOpen ? 'translate-x-0' : 'translate-x-full',
				)}
			>
				<div className="flex justify-between gap-4 px-7 py-4 shadow-sm">
					<Typography variant="h4">Shopping bag</Typography>
					<button
						onClick={closeCart}
						type="button"
						aria-label="Close cart"
					>
						<X />
					</button>
				</div>
				<div className="flex-1 p-7">
					<div className="flex gap-4">
						<div className="relative w-16 h-16">
							<Image
								className="rounded-lg object-cover"
								src="/nails-1.jpg"
								fill
								alt="item"
							/>
						</div>
						<div className="flex-1 flex flex-col justify-between">
							<div className="flex justify-between gap-4 mb-2">
								<Typography weight="medium">Koyuki</Typography>
								<button>
									<Trash className="text-primary" size={16} />
								</button>
							</div>

							<div className="flex justify-between gap-4">
								<div className="flex gap-2.5 items-center">
									<button className="relative w-4 h-4 border border-primary rounded-md flex justify-center items-center">
										<Minus className="text-primary" size={12} />
									</button>

									<Typography>1</Typography>

									<button className="relative w-4 h-4 border border-primary rounded-md flex justify-center items-center">
										<Plus className="text-primary" size={12} />
									</button>
								</div>
								<Typography weight="medium">€30.00</Typography>
							</div>
						</div>
					</div>
				</div>
				<div className="px-7 py-4 shadow-[0_-1px_3px_0_rgb(0,0,0,0.1),0_-1px_2px_-1px_rgb(0,0,0,0.1)]">
					<div className="flex justify-between gap-4 mb-4">
						<Typography weight="semibold">Subtotal:</Typography>
						<Typography weight="semibold">€30.00</Typography>
					</div>
					<Button className="w-full mb-2">Checkout</Button>
					<Typography className="flex justify-center items-center gap-2">
						<Lock size={16} />
						Secure checkout
					</Typography>
				</div>
			</aside>
		</>
	);
};

export default CartSidebar;
