'use server';

import {unstable_cache} from 'next/cache';
import {shopifyFetch} from './client';
import {localeToShopifyLanguage, parseProductRating} from './helpers';
import type {ShopifyProduct, ProductsResponse, ProductResponse} from './types';

const PRODUCT_FIELDS = `
  id
  title
  handle
  description
  priceRange {
    minVariantPrice {
      amount
      currencyCode
    }
  }
  options {
    name
    values
  }
  images(first: 5) {
    edges {
      node {
        url
        altText
      }
    }
  }
  variants(first: 10) {
    edges {
      node {
        id
        title
        availableForSale
		  quantityAvailable
        price {
          amount
          currencyCode
        }
		  selectedOptions {
          name
          value
        }
      }
    }
  }
  metafields(identifiers: [
    {namespace: "reviews", key: "rating"},
    {namespace: "reviews", key: "rating_count"}
  ]) {
    key
    value
  }
`;

interface GetProductsOptions {
	first?: number;
	after?: string;
	sortKey?: string;
	reverse?: boolean;
	locale: string;
}

export const getProducts = unstable_cache(
	async ({
		first = 12,
		after,
		sortKey,
		reverse = false,
		locale,
	}: GetProductsOptions): Promise<{
		products: ShopifyProduct[];
		pageInfo: {hasNextPage: boolean; endCursor: string | null};
	}> => {
		const language = localeToShopifyLanguage(locale);

		const query = `
			query GetProducts($first: Int!, $after: String, $sortKey: ProductSortKeys!, $reverse: Boolean!, $language: LanguageCode!) @inContext(language: $language) {
				products(first: $first, after: $after, sortKey: $sortKey, reverse: $reverse, query: "available_for_sale:true") {
					pageInfo {
						hasNextPage
						endCursor
					}
					edges {
						node { ${PRODUCT_FIELDS} }
					}
				}
			}
		`;

		const data = await shopifyFetch<ProductsResponse>(query, {
			first,
			after,
			sortKey,
			reverse,
			language,
		});

		return {
			products: data.products.edges.map(({node}) => node),
			pageInfo: data.products.pageInfo,
		};
	},
	['products'],
	{revalidate: 3600, tags: ['products']},
);

export const getProductByHandle = unstable_cache(
	async (handle: string, locale: string): Promise<ShopifyProduct | null> => {
		const language = localeToShopifyLanguage(locale);

		const query = `
			query GetProduct($handle: String!, $language: LanguageCode!) @inContext(language: $language) {
				product(handle: $handle) {
				${PRODUCT_FIELDS}
				}
			}
		`;

		const data = await shopifyFetch<ProductResponse>(query, {
			handle,
			language,
		});
		if (!data.product) return null;

		const {metafields, ...rest} = data.product;

		return {
			...rest,
			rating: parseProductRating(metafields),
		};
	},
	['product-by-handle'],
	{revalidate: 3600, tags: ['products']},
);
