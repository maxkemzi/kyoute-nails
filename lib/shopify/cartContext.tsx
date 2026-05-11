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
import {Cart, CartLine} from './types';
import {
	addToCart,
	createCart,
	getCart,
	removeFromCart,
	updateCartLine,
} from './cart';
import {TEMP_LINE_PREFIX} from './constants';
import {useDebouncedCallback} from 'use-debounce';

const CART_ID_KEY = 'shopify_cart_id';

interface CartContextValue {
	cart: Cart | null;
	isOpen: boolean;
	isLoading: boolean;
	addItem: (variantId: string, quantity?: number) => Promise<void>;
	updateItem: (lineId: string, quantity: number) => Promise<void>;
	removeItem: (lineId: string) => Promise<void>;
	openCart: () => void;
	closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({children}: {children: ReactNode}) {
	const [cart, setCart] = useState<Cart | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [quantity, setQuantity] = useState(0);

	// Load or create cart on mount
	useEffect(() => {
		async function initCart() {
			const storedId = localStorage.getItem(CART_ID_KEY);
			if (storedId) {
				const existing = await getCart(storedId);
				if (existing) return setCart(existing);
			}
			const newCart = await createCart();
			localStorage.setItem(CART_ID_KEY, newCart.id);
			setCart(newCart);
		}
		initCart();
	}, []);

	const openCart = () => setIsOpen(true);
	const closeCart = () => setIsOpen(false);

	const addItem = useCallback(
		async (variantId: string, quantity = 1) => {
			if (!cart) return;

			openCart();
			setCart(prev => {
				if (!prev) return prev;

				const existingEdge = prev.lines.edges.find(
					({node}) => node.merchandise.id === variantId,
				);

				if (existingEdge) {
					return {
						...prev,
						totalQuantity: prev.totalQuantity + quantity,
						lines: {
							edges: prev.lines.edges.map(({node}) =>
								node.merchandise.id === variantId
									? {
											node: {
												...node,
												quantity: node.quantity + quantity,
											},
										}
									: {node},
							),
						},
					};
				}

				const tempLine: CartLine = {
					id: `${TEMP_LINE_PREFIX}${variantId}`,
					quantity,
					merchandise: {
						id: variantId,
						title: 'Loading...',
						price: {amount: '0', currencyCode: 'EUR'},
						product: {
							title: 'Loading...',
							handle: '',
							images: {edges: []},
						},
					},
				};

				return {
					...prev,
					totalQuantity: prev.totalQuantity + quantity,
					lines: {edges: [{node: tempLine}, ...prev.lines.edges]},
				};
			});

			setIsLoading(true);
			try {
				const updated = await addToCart(cart.id, variantId, quantity);
				setCart(updated);
			} catch (e) {
				const reverted = await getCart(cart.id);
				if (reverted) setCart(reverted);
			} finally {
				setIsLoading(false);
			}
		},
		[cart],
	);

	const debouncedUpdateCartLine = useDebouncedCallback(
		async (cartId: string, lineId: string) => {
			try {
				const updated = await updateCartLine(cartId, lineId, quantity);
				setCart(updated);
			} catch {
				const reverted = await getCart(cartId);
				if (reverted) setCart(reverted);
			}
		},
		300,
	);

	const updateItem = useCallback(
		async (lineId: string, quantity: number) => {
			if (!cart) return;

			setQuantity(quantity);

			setCart(prev => {
				if (!prev) return prev;

				return {
					...prev,
					cost: {
						...prev.cost,
						subtotalAmount: {
							...prev.cost.subtotalAmount,
							amount: prev.lines.edges
								.reduce(
									(sum, {node}) =>
										node.id === lineId
											? sum +
												quantity *
													Number(node.merchandise.price.amount)
											: sum +
												node.quantity *
													Number(node.merchandise.price.amount),
									0,
								)
								.toFixed(2),
						},
					},
					totalQuantity: prev.lines.edges.reduce(
						(sum, {node}) =>
							node.id === lineId
								? sum + (quantity - node.quantity)
								: sum + node.quantity,
						0,
					),
					lines: {
						edges:
							quantity === 0
								? prev.lines.edges.filter(
										({node}) => node.id !== lineId,
									)
								: prev.lines.edges.map(({node}) =>
										node.id === lineId
											? {node: {...node, quantity}}
											: {node},
									),
					},
				};
			});

			debouncedUpdateCartLine(cart.id, lineId);
		},
		[cart, debouncedUpdateCartLine],
	);

	const removeItem = useCallback(
		async (lineId: string) => {
			if (!cart) return;

			setCart(prev => {
				if (!prev) return prev;

				const removed = prev.lines.edges.find(
					({node}) => node.id === lineId,
				);

				return {
					...prev,
					totalQuantity:
						prev.totalQuantity - (removed?.node.quantity ?? 0),
					lines: {
						edges: prev.lines.edges.filter(
							({node}) => node.id !== lineId,
						),
					},
				};
			});

			setIsLoading(true);
			try {
				const updated = await removeFromCart(cart.id, [lineId]);
				setCart(updated);
			} catch (e) {
				const reverted = await getCart(cart.id);
				if (reverted) setCart(reverted);
			} finally {
				setIsLoading(false);
			}
		},
		[cart],
	);

	return (
		<CartContext
			value={{
				cart,
				isOpen,
				isLoading,
				addItem,
				updateItem,
				removeItem,
				openCart,
				closeCart,
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
