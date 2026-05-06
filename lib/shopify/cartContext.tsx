'use client';

import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react';
import {Cart} from './types';
import {
	addToCart,
	createCart,
	getCart,
	removeFromCart,
	updateCartLine,
} from './cart';

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

	const addItem = useCallback(
		async (variantId: string, quantity = 1) => {
			if (!cart) return;
			setIsLoading(true);
			const updated = await addToCart(cart.id, variantId, quantity);
			setCart(updated);
			setIsLoading(false);
		},
		[cart],
	);

	const updateItem = useCallback(
		async (lineId: string, quantity: number) => {
			if (!cart) return;
			setIsLoading(true);
			const updated = await updateCartLine(cart.id, lineId, quantity);
			setCart(updated);
			setIsLoading(false);
		},
		[cart],
	);

	const removeItem = useCallback(
		async (lineId: string) => {
			if (!cart) return;
			setIsLoading(true);
			const updated = await removeFromCart(cart.id, [lineId]);
			setCart(updated);
			setIsLoading(false);
		},
		[cart],
	);

	const openCart = () => setIsOpen(true);
	const closeCart = () => setIsOpen(false);

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
