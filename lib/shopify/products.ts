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
  metafields(identifiers: [
    {namespace: "reviews", key: "rating"},
    {namespace: "reviews", key: "rating_count"}
  ]) {
    key
    value
  }
`;

export const getProducts = async (
	first = 12,
	after?: string | null,
	sortKey?: string,
	reverse = false,
): Promise<{
	products: ShopifyProduct[];
	pageInfo: {hasNextPage: boolean; endCursor: string | null};
}> => {
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
};

const parseProductRating = (
	metafields: ({key: string; value: string} | null)[],
) => {
	const ratingMeta = metafields.find(m => m?.key === 'rating');
	const countMeta = metafields.find(m => m?.key === 'rating_count');

	return {
		value: ratingMeta ? parseFloat(JSON.parse(ratingMeta.value).value) : 0,
		count: countMeta ? parseInt(countMeta.value) : 0,
	};
};

export const getProductByHandle = async (
	handle: string,
): Promise<ShopifyProduct | null> => {
	const query = `
    query GetProduct($handle: String!) {
      product(handle: $handle) {
        ${PRODUCT_FIELDS}
      }
    }
  `;

	const data = await shopifyFetch<ProductResponse>(query, {handle});
	if (!data.product) return null;

	const {metafields, ...rest} = data.product;

	return {
		...rest,
		rating: parseProductRating(metafields),
	};
};
