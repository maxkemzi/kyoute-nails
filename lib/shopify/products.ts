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
`;

export async function getProducts(
	first = 12,
	after?: string | null,
	sortKey?: string,
	reverse = false,
): Promise<{
	products: ShopifyProduct[];
	pageInfo: {hasNextPage: boolean; endCursor: string | null};
}> {
	const query = `
		query GetProducts($first: Int!, $after: String, $sortKey: ProductSortKeys!, $reverse: Boolean!) {
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
	});
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
