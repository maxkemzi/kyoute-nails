'use client';

import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import {
	addToCart,
	Cart,
	createCart,
	getCart,
	isAbortError,
	removeFromCart,
	updateCartLine,
} from '../shopify';
import {toast} from '../toast';
import {applyAddTempLine, applyRemoveLine, applyUpdateLine} from './helpers';
import {useLocale, useTranslations} from 'next-intl';

const CART_ID_KEY = 'shopify_cart_id';

interface CartContextValue {
	cart: Cart | null;
	isOpen: boolean;
	isInitializing: boolean;
	loadingItems: Set<string>;
	isAddingNewItem: boolean;
	addItem: (variantId: string, quantity?: number) => Promise<void>;
	updateItem: (lineId: string, quantity: number) => Promise<void>;
	removeItem: (lineId: string) => Promise<void>;
	openCart: () => void;
	closeCart: () => void;
	checkout: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({children}: {children: ReactNode}) {
	const locale = useLocale();
	const t = useTranslations('cart');
	const [cart, setCart] = useState<Cart | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [isInitializing, setIsInitializing] = useState(true);
	const [loadingItems, setLoadingItems] = useState<Set<string>>(new Set());
	const [isAddingNewItem, setIsAddingNewItem] = useState(false);
	const abortControllers = useRef<Map<string, AbortController>>(new Map());
	const pendingRemovals = useRef<Set<string>>(new Set());

	// Load or create cart on mount
	useEffect(() => {
		const initCart = async () => {
			try {
				const storedId = localStorage.getItem(CART_ID_KEY);
				if (storedId) {
					const existing = await getCart(storedId, locale);
					if (existing) {
						setCart(existing);
						return;
					}
					localStorage.removeItem(CART_ID_KEY);
				}
				const newCart = await createCart(locale);
				localStorage.setItem(CART_ID_KEY, newCart.id);
				setCart(newCart);
			} catch {
				toast.error(t('failedToInitialize'));
			} finally {
				setIsInitializing(false);
			}
		};

		initCart();
	}, [locale, t]);

	const openCart = useCallback(() => setIsOpen(true), []);
	const closeCart = useCallback(() => setIsOpen(false), []);

	const addLoadingItem = useCallback((id: string) => {
		setLoadingItems(prev => new Set(prev).add(id));
	}, []);

	const removeLoadingItem = useCallback((id: string) => {
		setLoadingItems(prev => {
			const next = new Set(prev);
			next.delete(id);
			return next;
		});
	}, []);

	const getAbortController = useCallback((id: string) => {
		abortControllers.current.get(id)?.abort();
		const controller = new AbortController();
		abortControllers.current.set(id, controller);
		return controller;
	}, []);

	const cleanupController = useCallback(
		(id: string, controller: AbortController) => {
			if (abortControllers.current.get(id) === controller) {
				abortControllers.current.delete(id);
				removeLoadingItem(id);
			}
		},
		[removeLoadingItem],
	);

	const revertCart = useCallback(
		async (cartId: string) => {
			try {
				const reverted = await getCart(cartId, locale);
				if (reverted) setCart(reverted);
			} catch {
				toast.error(t('failedToRestore'));
			}
		},
		[t],
	);

	const removeItem = useCallback(
		async (lineId: string) => {
			if (!cart) return;

			setCart(prev => (prev ? applyRemoveLine(prev, lineId) : prev));

			pendingRemovals.current.add(lineId);
			const controller = getAbortController(lineId);

			addLoadingItem(lineId);
			try {
				const updated = await removeFromCart(cart.id, [lineId], locale);
				if (controller.signal.aborted) return;

				pendingRemovals.current.delete(lineId);
				if (pendingRemovals.current.size === 0) {
					setCart(updated);
				}
			} catch (e) {
				pendingRemovals.current.delete(lineId);
				if (controller.signal.aborted || isAbortError(e)) return;
				await revertCart(cart.id);
				toast.error(t('failedToRemoveItem'));
			} finally {
				cleanupController(lineId, controller);
			}
		},
		[
			addLoadingItem,
			cart,
			cleanupController,
			getAbortController,
			locale,
			revertCart,
			t,
		],
	);

	const updateItem = useCallback(
		async (lineId: string, quantity: number) => {
			if (!cart) return;

			if (quantity === 0) {
				removeItem(lineId);
				return;
			}

			const existingLine = cart.lines.edges.find(
				({node}) => node.id === lineId,
			)?.node;

			if (existingLine) {
				const {quantityAvailable} = existingLine.merchandise;
				const maxQty = Math.min(quantityAvailable, 99);
				const maxQtyReached = quantity > maxQty;

				if (maxQtyReached) {
					toast.info(t('maxQuantityReached'));
					return;
				}
			}

			setCart(prev =>
				prev ? applyUpdateLine(prev, lineId, quantity) : prev,
			);

			const controller = getAbortController(lineId);

			addLoadingItem(lineId);
			try {
				const updated = await updateCartLine(
					cart.id,
					lineId,
					quantity,
					locale,
					controller.signal,
				);
				if (controller.signal.aborted) return;
				setCart(updated);
			} catch (e) {
				if (controller.signal.aborted || isAbortError(e)) return;
				await revertCart(cart.id);
				toast.error(t('failedToUpdateItem'));
			} finally {
				cleanupController(lineId, controller);
			}
		},
		[
			addLoadingItem,
			cart,
			cleanupController,
			getAbortController,
			locale,
			removeItem,
			revertCart,
			t,
		],
	);

	const addItem = useCallback(
		async (variantId: string, quantity = 1) => {
			if (!cart) return;

			openCart();

			const existingLine = cart.lines.edges.find(
				({node}) => node.merchandise.id === variantId,
			)?.node;

			if (existingLine) {
				updateItem(existingLine.id, existingLine.quantity + quantity);
				return;
			}

			setCart(prev =>
				prev ? applyAddTempLine(prev, variantId, quantity) : prev,
			);

			addLoadingItem(variantId);
			setIsAddingNewItem(true);
			try {
				const updated = await addToCart(
					cart.id,
					variantId,
					quantity,
					locale,
				);
				setCart(updated);
			} catch (e) {
				if (isAbortError(e)) return;
				await revertCart(cart.id);
				toast.error(t('failedToAddItem'));
			} finally {
				removeLoadingItem(variantId);
				setIsAddingNewItem(false);
			}
		},
		[
			addLoadingItem,
			cart,
			locale,
			openCart,
			removeLoadingItem,
			revertCart,
			t,
			updateItem,
		],
	);

	const checkout = useCallback(async () => {
		if (!cart) return;
		window.open(cart.checkoutUrl, '_blank');
	}, [cart]);

	return (
		<CartContext
			value={{
				cart,
				isOpen,
				isInitializing,
				loadingItems,
				isAddingNewItem,
				addItem,
				updateItem,
				removeItem,
				openCart,
				closeCart,
				checkout,
			}}
		>
			{children}
		</CartContext>
	);
}

export function useCart() {
	const ctx = useContext(CartContext);
	if (!ctx) throw new Error('useCart must be used inside CartProvider');
	return ctx;
}
