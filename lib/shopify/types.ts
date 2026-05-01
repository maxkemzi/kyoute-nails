export interface ShopifyImage {
	url: string;
	altText: string | null;
}

export interface ShopifyPrice {
	amount: string;
	currencyCode: string;
}

export interface ShopifyVariant {
	id: string;
	title: string;
	availableForSale: boolean;
	price: ShopifyPrice;
}

export interface ShopifyProduct {
	id: string;
	title: string;
	handle: string;
	description: string;
	priceRange: {
		minVariantPrice: ShopifyPrice;
	};
	images: {edges: {node: ShopifyImage}[]};
	variants: {edges: {node: ShopifyVariant}[]};
}

export interface ProductsResponse {
	products: {
		edges: {node: ShopifyProduct}[];
	};
}

export interface ProductResponse {
	product: ShopifyProduct | null;
}
