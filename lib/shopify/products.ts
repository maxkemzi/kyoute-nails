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

export async function getProducts(first = 20): Promise<ShopifyProduct[]> {
	const query = `
    query GetProducts($first: Int!) {
      products(first: $first) {
        edges {
          node { ${PRODUCT_FIELDS} }
        }
      }
    }
  `;

	const data = await shopifyFetch<ProductsResponse>(query, {first});
	return data.products.edges.map(({node}) => node);
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
