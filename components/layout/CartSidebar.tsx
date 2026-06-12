'use client';

import {TEMP_LINE_PREFIX} from '@/lib/cart';
import {useCart} from '@/lib/cart/cartContext';
import {formatPrice} from '@/lib/shopify';
import {useTranslations} from 'next-intl';
import Image from 'next/image';
import {useEffect} from 'react';
import {Lock, Minus, Plus, Trash, X} from 'react-feather';
import {twJoin} from 'tailwind-merge';
import NavigationLink from '../NavigationLink';
import {Button, Typography} from '../ui';

const CartSidebar = () => {
	const t = useTranslations('CartSidebar');
	const {
		cart,
		isOpen,
		closeCart,
		updateItem,
		removeItem,
		checkout,
		isAddingNewItem,
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
				aria-hidden="true"
				onClick={closeCart}
				className={twJoin(
					'fixed inset-0 bg-black/25 z-40 transition-opacity',
					isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
				)}
			/>
			<aside
				aria-label={t('title')}
				className={twJoin(
					'fixed right-0 top-0 bottom-0 z-50 max-w-90 w-full flex flex-col bg-background transition-transform',
					isOpen ? 'translate-x-0' : 'translate-x-full',
				)}
			>
				<div className="flex justify-between gap-4 px-7 py-4 shadow-border max-md:px-4">
					<Typography variant="h4" as="h2">
						{t('title')}
					</Typography>
					<button
						className="cursor-pointer"
						onClick={closeCart}
						type="button"
						aria-label={t('closeCart')}
					>
						<X />
					</button>
				</div>
				<div className="flex-1 overflow-hidden">
					<div className="h-full p-7 overflow-y-auto max-md:p-4">
						{lines.length === 0 ? (
							<div className="flex flex-col items-center justify-center h-full gap-3 text-center">
								<Typography>{t('empty')}</Typography>
							</div>
						) : (
							<div className="flex flex-col gap-4">
								{lines.map(line => {
									const {product, price, title, quantityAvailable} =
										line.merchandise;
									const image = product.images.edges[0]?.node;
									const isTemp = line.id.startsWith(TEMP_LINE_PREFIX);
									const maxQty = Math.min(quantityAvailable, 99);
									const maxQtyReached = line.quantity >= maxQty;

									return (
										<div key={line.id} className="flex gap-4">
											{!isTemp && image ? (
												<NavigationLink
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
												</NavigationLink>
											) : (
												<div className="w-16 h-16 shrink-0 animate-pulse bg-surface rounded-lg" />
											)}

											<div className="flex-1 flex flex-col justify-between overflow-hidden">
												{!isTemp ? (
													<>
														<div className="flex justify-between gap-4 mb-2">
															<div className="truncate">
																<Typography
																	className="mb-1"
																	weight="medium"
																	truncate
																>
																	{product.title}
																</Typography>

																{title !== 'Default Title' ? (
																	<Typography
																		className="text-background-foreground/60"
																		size="sm"
																		textTransform="uppercase"
																		truncate
																	>
																		{title}
																	</Typography>
																) : null}
															</div>
															<button
																className="cursor-pointer"
																onClick={() =>
																	removeItem(line.id)
																}
																type="button"
																aria-label={t('removeItem')}
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
																	className={twJoin(
																		'relative w-4 h-4 border rounded-md flex justify-center items-center cursor-pointer',
																		line.quantity <= 1
																			? 'border-disabled'
																			: 'border-primary',
																	)}
																	onClick={() =>
																		updateItem(
																			line.id,
																			line.quantity - 1,
																		)
																	}
																	disabled={line.quantity <= 1}
																	aria-label={t(
																		'decreaseQuantity',
																	)}
																>
																	<Minus
																		className={
																			line.quantity <= 1
																				? 'text-disabled'
																				: 'text-primary'
																		}
																		size={12}
																	/>
																</button>

																<Typography
																	className="w-[2ch] text-center tabular-nums"
																	aria-live="polite"
																	aria-atomic="true"
																>
																	{line.quantity}
																</Typography>

																<button
																	className={twJoin(
																		'relative w-4 h-4 border rounded-md flex justify-center items-center cursor-pointer',
																		maxQtyReached
																			? 'border-disabled'
																			: 'border-primary',
																	)}
																	onClick={() =>
																		updateItem(
																			line.id,
																			line.quantity + 1,
																		)
																	}
																	disabled={maxQtyReached}
																	aria-label={t(
																		'increaseQuantity',
																	)}
																>
																	<Plus
																		className={
																			maxQtyReached
																				? 'text-disabled'
																				: 'text-primary'
																		}
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
				</div>

				{lines.length > 0 && cart ? (
					<div className="px-7 py-4 shadow-border max-md:px-4">
						<div className="flex justify-between gap-4 mb-4">
							<Typography weight="semibold">{t('subtotal')}:</Typography>
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
							{t('checkout')}
						</Button>
						<Typography className="flex justify-center items-center gap-2">
							<Lock size={16} />
							{t('secureCheckout')}
						</Typography>
					</div>
				) : null}
			</aside>
		</>
	);
};

export default CartSidebar;
