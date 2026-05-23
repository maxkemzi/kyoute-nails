'use client';

import {useCart} from '@/lib/shopify/cartContext';
import Image from 'next/image';
import {Lock, Minus, Plus, Trash, X} from 'react-feather';
import {twJoin} from 'tailwind-merge';
import {Button, Typography} from '../ui';
import {useEffect} from 'react';
import {formatPrice} from '@/lib/shopify/helpers';
import Link from 'next/link';
import {TEMP_LINE_PREFIX} from '@/lib/shopify/constants';
import {CheckoutModal} from '..';

const CartSidebar = () => {
	const {
		cart,
		isOpen,
		closeCart,
		updateItem,
		removeItem,
		checkout,
		isAddingNewItem,
		isCheckoutModalOpen,
		closeCheckoutModal,
	} = useCart();

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

	const lines = cart?.lines.edges.map(({node}) => node).reverse() ?? [];

	return (
		<>
			<div
				onClick={closeCart}
				className={twJoin(
					'fixed inset-0 bg-black/20 z-40 transition-opacity',
					isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
				)}
			/>
			<aside
				className={twJoin(
					'fixed right-0 top-0 bottom-0 z-50 max-w-90 w-full flex flex-col bg-background transition-transform',
					isOpen ? 'translate-x-0' : 'translate-x-full',
				)}
			>
				<div className="flex justify-between gap-4 px-7 py-4 shadow-border">
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
					{lines.length === 0 ? (
						<div className="flex flex-col items-center justify-center h-full gap-3 text-center">
							<Typography>Your bag is empty.</Typography>
						</div>
					) : (
						<div className="flex flex-col gap-4">
							{lines.map(line => {
								const {product, price} = line.merchandise;
								const image = product.images.edges[0]?.node;
								const isTemp = line.id.startsWith(TEMP_LINE_PREFIX);

								return (
									<div key={line.id} className="flex gap-4">
										{!isTemp && image ? (
											<Link
												className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden"
												href={`/buy-press-on-nails/${product.handle}`}
												onClick={closeCart}
											>
												<Image
													className="object-cover"
													src={image.url}
													fill
													alt={image.altText ?? product.title}
												/>
											</Link>
										) : (
											<div className="w-16 h-16 shrink-0 animate-pulse bg-surface rounded-lg" />
										)}

										<div className="flex-1 flex flex-col justify-between">
											{!isTemp ? (
												<>
													<div className="flex justify-between gap-4 mb-2">
														<Typography weight="medium">
															{product.title}
														</Typography>
														<button
															onClick={() => removeItem(line.id)}
															type="button"
														>
															<Trash
																className="text-primary"
																size={16}
															/>
														</button>
													</div>

													<div className="flex justify-between gap-4">
														<div className="flex gap-2.5 items-center">
															<button
																className="relative w-4 h-4 border border-primary rounded-md flex justify-center items-center"
																onClick={() =>
																	updateItem(
																		line.id,
																		line.quantity - 1,
																	)
																}
															>
																<Minus
																	className="text-primary"
																	size={12}
																/>
															</button>

															<Typography>
																{line.quantity}
															</Typography>

															<button
																className="relative w-4 h-4 border border-primary rounded-md flex justify-center items-center"
																onClick={() =>
																	updateItem(
																		line.id,
																		line.quantity + 1,
																	)
																}
															>
																<Plus
																	className="text-primary"
																	size={12}
																/>
															</button>
														</div>
														<Typography weight="medium">
															{formatPrice(
																price.amount,
																price.currencyCode,
															)}
														</Typography>
													</div>
												</>
											) : (
												<>
													<div className="flex-1 flex justify-between gap-4 mb-2">
														<div className="flex-1 bg-surface animate-pulse rounded-lg" />
														<div className="flex-1 bg-surface animate-pulse rounded-lg" />
													</div>
													<div className="flex-1 flex justify-between gap-4">
														<div className="flex-1 bg-surface animate-pulse rounded-lg" />
														<div className="flex-1 bg-surface animate-pulse rounded-lg" />
													</div>
												</>
											)}
										</div>
									</div>
								);
							})}
						</div>
					)}
				</div>

				{lines.length > 0 && cart && (
					<div className="px-7 py-4 shadow-[0_-1px_3px_0_rgb(0,0,0,0.1),0_-1px_2px_-1px_rgb(0,0,0,0.1)]">
						<div className="flex justify-between gap-4 mb-4">
							<Typography weight="semibold">Subtotal:</Typography>
							{isAddingNewItem ? (
								<div className="w-16 h-6 bg-surface animate-pulse rounded-lg" />
							) : (
								<Typography weight="semibold">
									{formatPrice(
										cart.cost.subtotalAmount.amount,
										cart.cost.subtotalAmount.currencyCode,
									)}
								</Typography>
							)}
						</div>
						<Button className="w-full mb-2" onClick={checkout}>
							Checkout
						</Button>
						<Typography className="flex justify-center items-center gap-2">
							<Lock size={16} />
							Secure checkout
						</Typography>
					</div>
				)}
			</aside>
			{isCheckoutModalOpen ? (
				<CheckoutModal onClose={closeCheckoutModal} />
			) : null}
		</>
	);
};

export default CartSidebar;
