import {TEMP_LINE_PREFIX} from './constants';
import {Cart, CartLine} from './types';

export const withRetry = async <T>(
	fn: () => Promise<T>,
	shouldRetry: (e: unknown) => boolean,
	retries = 1,
): Promise<T> => {
	try {
		return await fn();
	} catch (e) {
		if (retries > 0 && shouldRetry(e)) {
			await new Promise(res => setTimeout(res, 300));
			return withRetry(fn, shouldRetry, retries - 1);
		}
		throw e;
	}
};

export const isRetryableError = (e: unknown) =>
	e instanceof Error &&
	(e.message.includes('conflicted with another request') ||
		e.message.includes('ETIMEDOUT') ||
		e.name === 'TimeoutError');

export const applyRemoveLine = (cart: Cart, lineId: string): Cart => {
	const removed = cart.lines.edges.find(({node}) => node.id === lineId);
	return {
		...cart,
		cost: {
			...cart.cost,
			subtotalAmount: {
				...cart.cost.subtotalAmount,
				amount: cart.lines.edges
					.reduce(
						(sum, {node}) =>
							node.id === lineId
								? sum
								: sum +
									node.quantity *
										Number(node.merchandise.price.amount),
						0,
					)
					.toFixed(2),
			},
		},
		totalQuantity: cart.totalQuantity - (removed?.node.quantity ?? 0),
		lines: {
			edges: cart.lines.edges.filter(({node}) => node.id !== lineId),
		},
	};
};

export const applyUpdateLine = (
	cart: Cart,
	lineId: string,
	quantity: number,
): Cart => {
	return {
		...cart,
		cost: {
			...cart.cost,
			subtotalAmount: {
				...cart.cost.subtotalAmount,
				amount: cart.lines.edges
					.reduce(
						(sum, {node}) =>
							node.id === lineId
								? sum + quantity * Number(node.merchandise.price.amount)
								: sum +
									node.quantity *
										Number(node.merchandise.price.amount),
						0,
					)
					.toFixed(2),
			},
		},
		totalQuantity: cart.lines.edges.reduce(
			(sum, {node}) =>
				node.id === lineId
					? sum + (quantity - node.quantity)
					: sum + node.quantity,
			0,
		),
		lines: {
			edges: cart.lines.edges.map(({node}) =>
				node.id === lineId ? {node: {...node, quantity}} : {node},
			),
		},
	};
};

export const applyAddTempLine = (
	cart: Cart,
	variantId: string,
	quantity: number,
): Cart => {
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
		...cart,
		totalQuantity: cart.totalQuantity + quantity,
		lines: {edges: [{node: tempLine}, ...cart.lines.edges]},
	};
};

export function formatPrice(amount: string, currencyCode: string): string {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: currencyCode,
	}).format(parseFloat(amount));
}
