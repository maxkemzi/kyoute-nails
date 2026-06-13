import {shopifyFetch} from './client';
import {localeToShopifyLanguage} from './helpers';
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
				quantityAvailable
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

export async function getCart(
	cartId: string,
	locale: string,
): Promise<Cart | null> {
	const language = localeToShopifyLanguage(locale);

	const query = `
	 query GetCart($cartId: ID!, $language: LanguageCode!) @inContext(language: $language) {
		cart(id: $cartId) { ${CART_FIELDS} }
	 }
  `;

	const data = await shopifyFetch<CartResponse>(query, {cartId, language});
	return data.cart;
}

export async function createCart(locale: string): Promise<Cart> {
	const language = localeToShopifyLanguage(locale);

	const mutation = `
	 mutation CreateCart($language: LanguageCode!) @inContext(language: $language) {
		cartCreate { cart { ${CART_FIELDS} } }
	 }
  `;

	const data = await shopifyFetch<CartCreateResponse>(mutation, {language});
	return data.cartCreate.cart;
}

export async function addToCart(
	cartId: string,
	variantId: string,
	quantity: number = 1,
	locale: string,
): Promise<Cart> {
	const language = localeToShopifyLanguage(locale);

	const mutation = `
	 mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!, $language: LanguageCode!) @inContext(language: $language) {
		cartLinesAdd(cartId: $cartId, lines: $lines) {
		  cart { ${CART_FIELDS} }
		}
	 }
  `;
	const data = await shopifyFetch<CartLinesAddResponse>(mutation, {
		cartId,
		lines: [{merchandiseId: variantId, quantity}],
		language,
	});
	return data.cartLinesAdd.cart;
}

export async function updateCartLine(
	cartId: string,
	lineId: string,
	quantity: number,
	locale: string,
	signal?: AbortSignal,
): Promise<Cart> {
	const language = localeToShopifyLanguage(locale);

	const mutation = `
	 mutation UpdateCart($cartId: ID!, $lines: [CartLineUpdateInput!]!, $language: LanguageCode!) @inContext(language: $language) {
		cartLinesUpdate(cartId: $cartId, lines: $lines) {
		  cart { ${CART_FIELDS} }
		}
	 }
  `;

	const data = await shopifyFetch<CartLinesUpdateResponse>(
		mutation,
		{
			cartId,
			lines: [{id: lineId, quantity}],
			language,
		},
		signal,
	);
	return data.cartLinesUpdate.cart;
}

export async function removeFromCart(
	cartId: string,
	lineIds: string[],
	locale: string,
): Promise<Cart> {
	const language = localeToShopifyLanguage(locale);

	const mutation = `
	 mutation RemoveFromCart($cartId: ID!, $lineIds: [ID!]!, $language: LanguageCode!) @inContext(language: $language) {
		cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
		  cart { ${CART_FIELDS} }
		}
	 }
  `;

	const data = await shopifyFetch<CartLinesRemoveResponse>(mutation, {
		cartId,
		lineIds,
		language,
	});
	return data.cartLinesRemove.cart;
}
