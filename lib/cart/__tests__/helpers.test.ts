import {applyRemoveLine, applyUpdateLine, applyAddTempLine} from '../helpers';
import {TEMP_LINE_PREFIX} from '../constants';
import {Cart} from '../../shopify';

const mockCart = (): Cart => ({
	id: 'cart-1',
	checkoutUrl: 'https://example.com/checkout',
	totalQuantity: 3,
	cost: {
		totalAmount: {amount: '60.00', currencyCode: 'EUR'},
		subtotalAmount: {amount: '60.00', currencyCode: 'EUR'},
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
						quantityAvailable: 99,
						product: {
							title: 'Koyuki',
							handle: 'koyuki',
							images: {edges: []},
						},
					},
				},
			},
			{
				node: {
					id: 'line-2',
					quantity: 1,
					merchandise: {
						id: 'variant-2',
						title: 'L',
						price: {amount: '20.00', currencyCode: 'EUR'},
						quantityAvailable: 99,
						product: {
							title: 'Yuliana',
							handle: 'yuliana',
							images: {edges: []},
						},
					},
				},
			},
		],
	},
});

// --- applyRemoveLine ---

describe('applyRemoveLine', () => {
	it('removes the correct line', () => {
		const result = applyRemoveLine(mockCart(), 'line-1');
		expect(result.lines.edges).toHaveLength(1);
		expect(result.lines.edges[0].node.id).toBe('line-2');
	});

	it('decreases totalQuantity by the removed line quantity', () => {
		const result = applyRemoveLine(mockCart(), 'line-1');
		expect(result.totalQuantity).toBe(1); // was 3, removed 2
	});

	it('recalculates subtotalAmount correctly', () => {
		const result = applyRemoveLine(mockCart(), 'line-1');
		expect(result.cost.subtotalAmount.amount).toBe('20.00'); // only line-2 remains: 1 * 20
	});

	it('does nothing if lineId does not exist', () => {
		const cart = mockCart();
		const result = applyRemoveLine(cart, 'non-existent');
		expect(result.lines.edges).toHaveLength(2);
		expect(result.totalQuantity).toBe(3);
	});

	it('preserves other cart fields', () => {
		const cart = mockCart();
		const result = applyRemoveLine(cart, 'line-1');
		expect(result.id).toBe(cart.id);
		expect(result.checkoutUrl).toBe(cart.checkoutUrl);
	});
});

// --- applyUpdateLine ---

describe('applyUpdateLine', () => {
	it('updates quantity of the correct line', () => {
		const result = applyUpdateLine(mockCart(), 'line-1', 5);
		const line = result.lines.edges.find(({node}) => node.id === 'line-1');
		expect(line?.node.quantity).toBe(5);
	});

	it('does not affect other lines', () => {
		const result = applyUpdateLine(mockCart(), 'line-1', 5);
		const line = result.lines.edges.find(({node}) => node.id === 'line-2');
		expect(line?.node.quantity).toBe(1);
	});

	it('recalculates totalQuantity correctly', () => {
		const result = applyUpdateLine(mockCart(), 'line-1', 5);
		expect(result.totalQuantity).toBe(6); // 5 + 1
	});

	it('recalculates subtotalAmount correctly', () => {
		const result = applyUpdateLine(mockCart(), 'line-1', 5);
		expect(result.cost.subtotalAmount.amount).toBe('120.00'); // 5*20 + 1*20
	});

	it('preserves other cart fields', () => {
		const cart = mockCart();
		const result = applyUpdateLine(cart, 'line-1', 5);
		expect(result.id).toBe(cart.id);
		expect(result.checkoutUrl).toBe(cart.checkoutUrl);
	});
});

// --- applyAddTempLine ---

describe('applyAddTempLine', () => {
	it('adds a temp line to the beginning of lines', () => {
		const result = applyAddTempLine(mockCart(), 'variant-3', 1);
		expect(result.lines.edges[0].node.id).toBe(
			`${TEMP_LINE_PREFIX}variant-3`,
		);
	});

	it('increases totalQuantity by the added quantity', () => {
		const result = applyAddTempLine(mockCart(), 'variant-3', 2);
		expect(result.totalQuantity).toBe(5); // was 3, added 2
	});

	it('does not change existing lines', () => {
		const result = applyAddTempLine(mockCart(), 'variant-3', 1);
		expect(result.lines.edges).toHaveLength(3);
		expect(result.lines.edges[1].node.id).toBe('line-1');
		expect(result.lines.edges[2].node.id).toBe('line-2');
	});

	it('creates temp line with correct variantId', () => {
		const result = applyAddTempLine(mockCart(), 'variant-3', 1);
		const tempLine = result.lines.edges[0].node;
		expect(tempLine.merchandise.id).toBe('variant-3');
	});

	it('creates temp line with correct quantity', () => {
		const result = applyAddTempLine(mockCart(), 'variant-3', 3);
		const tempLine = result.lines.edges[0].node;
		expect(tempLine.quantity).toBe(3);
	});

	it('creates temp line with Loading placeholder data', () => {
		const result = applyAddTempLine(mockCart(), 'variant-3', 1);
		const tempLine = result.lines.edges[0].node;
		expect(tempLine.merchandise.title).toBe('Loading...');
		expect(tempLine.merchandise.product.title).toBe('Loading...');
	});

	it('preserves other cart fields', () => {
		const cart = mockCart();
		const result = applyAddTempLine(cart, 'variant-3', 1);
		expect(result.id).toBe(cart.id);
		expect(result.checkoutUrl).toBe(cart.checkoutUrl);
	});
});
