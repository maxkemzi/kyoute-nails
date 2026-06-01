export interface ShopifyImage {
	url: string;
	altText: string | null;
}

export interface ShopifyPrice {
	amount: string;
	currencyCode: string;
}

export interface ShopifyProductOption {
	name: string;
	values: string[];
}

export interface ShopifyVariant {
	id: string;
	title: string;
	availableForSale: boolean;
	price: ShopifyPrice;
	selectedOptions: {name: string; value: string}[];
}

export interface ShopifyProductRaw {
	id: string;
	title: string;
	handle: string;
	description: string;
	priceRange: {
		minVariantPrice: ShopifyPrice;
	};
	images: {edges: {node: ShopifyImage}[]};
	variants: {edges: {node: ShopifyVariant}[]};
	options: ShopifyProductOption[];
	metafields: ({key: string; value: string} | null)[];
}

export interface ShopifyProduct extends Omit<ShopifyProductRaw, 'metafields'> {
	rating: {
		value: number;
		count: number;
	};
}

export interface ProductsResponse {
	products: {
		pageInfo: {
			hasNextPage: boolean;
			endCursor: string | null;
		};
		edges: {node: ShopifyProduct}[];
	};
}

export interface ProductResponse {
	product: ShopifyProductRaw | null;
}

export interface CartLine {
	id: string;
	quantity: number;
	merchandise: {
		id: string;
		title: string;
		price: ShopifyPrice;
		product: {
			title: string;
			handle: string;
			images: {edges: {node: ShopifyImage}[]};
		};
	};
}

export interface Cart {
	id: string;
	checkoutUrl: string;
	totalQuantity: number;
	cost: {
		totalAmount: ShopifyPrice;
		subtotalAmount: ShopifyPrice;
	};
	lines: {edges: {node: CartLine}[]};
}

export interface CartResponse {
	cart: Cart | null;
}

export interface CartCreateResponse {
	cartCreate: {cart: Cart};
}

export interface CartLinesAddResponse {
	cartLinesAdd: {cart: Cart};
}

export interface CartLinesUpdateResponse {
	cartLinesUpdate: {cart: Cart};
}

export interface CartLinesRemoveResponse {
	cartLinesRemove: {cart: Cart};
}
