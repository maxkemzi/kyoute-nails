import {getProducts, PRODUCTS_PER_PAGE, sortMap} from '@/lib/shopify';
import ProductGrid from './ProductGrid';
import {getLocale} from 'next-intl/server';

interface Props {
	sortParam: keyof typeof sortMap;
}

const ProductFeed = async ({sortParam}: Props) => {
	const {sortKey, reverse} = sortMap[sortParam];

	const locale = await getLocale();
	const {products, pageInfo} = await getProducts({
		first: PRODUCTS_PER_PAGE,
		sortKey,
		reverse,
		locale,
	});

	return (
		<ProductGrid
			initialProducts={products}
			initialCursor={pageInfo.endCursor}
			initialHasNextPage={pageInfo.hasNextPage}
		/>
	);
};

export default ProductFeed;
