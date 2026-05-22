'use server';

import {shopifyFetch} from './client';
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
        price {
          amount
          currencyCode
        }
      }
    }
  }
`;

export async function getProducts(
	first = 20,
	after?: string | null,
): Promise<{
	products: ShopifyProduct[];
	pageInfo: {hasNextPage: boolean; endCursor: string | null};
}> {
	const query = `
		query GetProducts($first: Int!, $after: String) {
			products(first: $first, after: $after) {
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

	const data = await shopifyFetch<ProductsResponse>(query, {first, after});
	return {
		products: data.products.edges.map(({node}) => node),
		pageInfo: data.products.pageInfo,
	};
}

export async function getProductByHandle(
	handle: string,
): Promise<ShopifyProduct | null> {
	const query = `
    query GetProduct($handle: String!) {
      product(handle: $handle) {
        ${PRODUCT_FIELDS}
      }
    }
  `;

	const data = await shopifyFetch<ProductResponse>(query, {handle});
	return data.product;
}
