/**
 * @jest-environment jsdom
 */

import {useCart} from '@/lib/cart/cartContext';
import {fireEvent, screen} from '@testing-library/react';
import {render} from '@/test.utils';
import CartSidebar from '../CartSidebar';

jest.mock('@/lib/cart/cartContext');
jest.mock('next/image', () => ({
	__esModule: true,
	default: ({alt, fill, ...props}: {alt: string; fill?: boolean}) => (
		<img alt={alt} {...props} />
	),
}));
jest.mock('next/link', () => ({
	__esModule: true,
	default: ({
		children,
		...props
	}: {
		children: React.ReactNode;
		[key: string]: unknown;
	}) => <a {...props}>{children}</a>,
}));

const mockUseCart = useCart as jest.Mock;

const createMockCart = () => ({
	id: 'cart-1',
	checkoutUrl: 'https://example.com/checkout',
	totalQuantity: 2,
	cost: {
		totalAmount: {amount: '40.00', currencyCode: 'EUR'},
		subtotalAmount: {amount: '40.00', currencyCode: 'EUR'},
	},
	lines: {
		edges: [
			{
				node: {
					id: 'line-1',
					quantity: 2,
					merchandise: {
						id: 'variant-1',
						title: 'M',
						price: {amount: '20.00', currencyCode: 'EUR'},
						product: {
							title: 'Koyuki',
							handle: 'koyuki',
							images: {
								edges: [
									{node: {url: '/koyuki.jpg', altText: 'Koyuki'}},
								],
							},
						},
					},
				},
			},
		],
	},
});

const createDefaultContext = () => ({
	cart: createMockCart(),
	isOpen: true,
	closeCart: jest.fn(),
	updateItem: jest.fn(),
	removeItem: jest.fn(),
	checkout: jest.fn(),
	isAddingNewItem: false,
	loadingItems: new Set(),
	openCart: jest.fn(),
	addItem: jest.fn(),
});

beforeEach(() => {
	mockUseCart.mockReturnValue(createDefaultContext());
});

describe('CartSidebar', () => {
	// --- rendering ---

	it('renders cart items when open', () => {
		render(<CartSidebar />);
		expect(screen.getByText('Koyuki')).toBeInTheDocument();
		expect(screen.getByText('M')).toBeInTheDocument();
		expect(screen.getByText('€20.00')).toBeInTheDocument();
	});

	it('renders empty state when no items', () => {
		const ctx = createDefaultContext();
		ctx.cart.lines.edges = [];
		ctx.cart.totalQuantity = 0;
		mockUseCart.mockReturnValue(ctx);
		render(<CartSidebar />);
		expect(screen.getByText('Your bag is empty')).toBeInTheDocument();
	});

	it('renders nothing when cart is null', () => {
		const ctx = createDefaultContext();
		mockUseCart.mockReturnValue({...ctx, cart: null});
		render(<CartSidebar />);
		expect(screen.queryByText('Subtotal:')).not.toBeInTheDocument();
	});

	it('renders subtotal when items are present', () => {
		render(<CartSidebar />);
		expect(screen.getByText('Subtotal:')).toBeInTheDocument();
		expect(screen.getByText('€40.00')).toBeInTheDocument();
	});

	it('renders checkout button when items are present', () => {
		render(<CartSidebar />);
		expect(
			screen.getByRole('button', {name: /checkout/i}),
		).toBeInTheDocument();
	});

	it('does not render checkout section when cart is empty', () => {
		const ctx = createDefaultContext();
		ctx.cart.lines.edges = [];
		ctx.cart.totalQuantity = 0;
		mockUseCart.mockReturnValue(ctx);
		render(<CartSidebar />);
		expect(
			screen.queryByRole('button', {name: /checkout/i}),
		).not.toBeInTheDocument();
	});

	it('hides variant title when it is Default Title', () => {
		const ctx = createDefaultContext();
		ctx.cart.lines.edges[0].node.merchandise.title = 'Default Title';
		mockUseCart.mockReturnValue(ctx);
		render(<CartSidebar />);
		expect(screen.queryByText('Default Title')).not.toBeInTheDocument();
	});

	it('shows subtotal skeleton when adding new item', () => {
		const ctx = createDefaultContext();
		mockUseCart.mockReturnValue({...ctx, isAddingNewItem: true});
		render(<CartSidebar />);
		expect(screen.queryByText('€40.00')).not.toBeInTheDocument();
	});

	// --- open/close ---

	it('is visible when isOpen is true', () => {
		render(<CartSidebar />);
		const aside = screen.getByRole('complementary');
		expect(aside).toHaveClass('translate-x-0');
	});

	it('is hidden when isOpen is false', () => {
		const ctx = createDefaultContext();
		mockUseCart.mockReturnValue({...ctx, isOpen: false});
		render(<CartSidebar />);
		const aside = screen.getByRole('complementary');
		expect(aside).toHaveClass('translate-x-full');
	});

	it('calls closeCart when close button is clicked', () => {
		const ctx = createDefaultContext();
		mockUseCart.mockReturnValue(ctx);
		render(<CartSidebar />);
		fireEvent.click(screen.getByLabelText('Close cart'));
		expect(ctx.closeCart).toHaveBeenCalledTimes(1);
	});

	it('calls closeCart when backdrop is clicked', () => {
		const ctx = createDefaultContext();
		mockUseCart.mockReturnValue(ctx);
		render(<CartSidebar />);
		const backdrop = screen.getByRole('complementary')
			.previousSibling as HTMLElement;
		fireEvent.click(backdrop);
		expect(ctx.closeCart).toHaveBeenCalledTimes(1);
	});

	it('calls closeCart when Escape key is pressed', () => {
		const ctx = createDefaultContext();
		mockUseCart.mockReturnValue(ctx);
		render(<CartSidebar />);
		fireEvent.keyDown(window, {key: 'Escape'});
		expect(ctx.closeCart).toHaveBeenCalledTimes(1);
	});

	// --- interactions ---

	it('calls removeItem when trash button is clicked', () => {
		const ctx = createDefaultContext();
		mockUseCart.mockReturnValue(ctx);
		render(<CartSidebar />);
		fireEvent.click(screen.getByRole('button', {name: 'Remove item'}));
		expect(ctx.removeItem).toHaveBeenCalledWith('line-1');
	});

	it('calls updateItem with decreased quantity when minus is clicked', () => {
		const ctx = createDefaultContext();
		mockUseCart.mockReturnValue(ctx);
		render(<CartSidebar />);
		fireEvent.click(screen.getByRole('button', {name: 'Decrease quantity'}));
		expect(ctx.updateItem).toHaveBeenCalledWith('line-1', 1);
	});

	it('calls updateItem with increased quantity when plus is clicked', () => {
		const ctx = createDefaultContext();
		mockUseCart.mockReturnValue(ctx);
		render(<CartSidebar />);
		fireEvent.click(screen.getByRole('button', {name: 'Increase quantity'}));
		expect(ctx.updateItem).toHaveBeenCalledWith('line-1', 3);
	});

	it('calls checkout when checkout button is clicked', () => {
		const ctx = createDefaultContext();
		mockUseCart.mockReturnValue(ctx);
		render(<CartSidebar />);
		fireEvent.click(screen.getByRole('button', {name: /checkout/i}));
		expect(ctx.checkout).toHaveBeenCalledTimes(1);
	});

	it('calls closeCart when product link is clicked', () => {
		const ctx = createDefaultContext();
		mockUseCart.mockReturnValue(ctx);
		render(<CartSidebar />);
		fireEvent.click(screen.getByRole('link'));
		expect(ctx.closeCart).toHaveBeenCalledTimes(1);
	});

	// --- temp lines ---

	it('renders skeleton for temp lines', () => {
		const ctx = createDefaultContext();
		ctx.cart.lines.edges[0].node.id = 'temp_variant-1';
		mockUseCart.mockReturnValue(ctx);
		render(<CartSidebar />);
		expect(screen.queryByText('Koyuki')).not.toBeInTheDocument();
	});

	// --- body scroll lock ---

	it('locks body scroll when open', () => {
		render(<CartSidebar />);
		expect(document.body.style.overflow).toBe('hidden');
	});

	it('unlocks body scroll when closed', () => {
		const ctx = createDefaultContext();
		mockUseCart.mockReturnValue({...ctx, isOpen: false});
		render(<CartSidebar />);
		expect(document.body.style.overflow).toBe('');
	});
});
