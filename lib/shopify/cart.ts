'use server';

import {shopifyFetch} from './client';
import {
	Cart,
	CartCreateResponse,
	CartLinesAddResponse,
	CartLinesRemoveResponse,
	CartLinesUpdateResponse,
	CartResponse,
} from './types';

const CART_FIELDS = `
  id
  checkoutUrl
  totalQuantity
  cost {
	 totalAmount { amount currencyCode }
	 subtotalAmount { amount currencyCode }
  }
  lines(first: 100) {
	 edges {
		node {
		  id
		  quantity
		  merchandise {
			 ... on ProductVariant {
				id
				title
				price { amount currencyCode }
				product {
				  title
				  handle
				  images(first: 1) {
					 edges { node { url altText } }
				  }
				}
			 }
		  }
		}
	 }
  }
`;

export async function getCart(cartId: string): Promise<Cart | null> {
	const query = `
	 query GetCart($cartId: ID!) {
		cart(id: $cartId) { ${CART_FIELDS} }
	 }
  `;
	const data = await shopifyFetch<CartResponse>(query, {cartId});
	return data.cart;
}

export async function createCart(): Promise<Cart> {
	const mutation = `
	 mutation CreateCart {
		cartCreate { cart { ${CART_FIELDS} } }
	 }
  `;
	const data = await shopifyFetch<CartCreateResponse>(mutation);
	return data.cartCreate.cart;
}

export async function addToCart(
	cartId: string,
	variantId: string,
	quantity: number = 1,
): Promise<Cart> {
	const mutation = `
	 mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
		cartLinesAdd(cartId: $cartId, lines: $lines) {
		  cart { ${CART_FIELDS} }
		}
	 }
  `;
	const data = await shopifyFetch<CartLinesAddResponse>(mutation, {
		cartId,
		lines: [{merchandiseId: variantId, quantity}],
	});
	return data.cartLinesAdd.cart;
}

export async function updateCartLine(
	cartId: string,
	lineId: string,
	quantity: number,
): Promise<Cart> {
	const mutation = `
	 mutation UpdateCart($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
		cartLinesUpdate(cartId: $cartId, lines: $lines) {
		  cart { ${CART_FIELDS} }
		}
	 }
  `;
	const data = await shopifyFetch<CartLinesUpdateResponse>(mutation, {
		cartId,
		lines: [{id: lineId, quantity}],
	});
	return data.cartLinesUpdate.cart;
}

export async function removeFromCart(
	cartId: string,
	lineIds: string[],
): Promise<Cart> {
	const mutation = `
	 mutation RemoveFromCart($cartId: ID!, $lineIds: [ID!]!) {
		cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
		  cart { ${CART_FIELDS} }
		}
	 }
  `;
	const data = await shopifyFetch<CartLinesRemoveResponse>(mutation, {
		cartId,
		lineIds,
	});
	return data.cartLinesRemove.cart;
}
