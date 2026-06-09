import {getProducts, PRODUCTS_PER_PAGE, sortMap} from '@/lib/shopify';
import ProductGrid from './ProductGrid';

interface Props {
	sortParam: keyof typeof sortMap;
}

const ProductFeed = async ({sortParam}: Props) => {
	const {sortKey, reverse} = sortMap[sortParam];

	const {products, pageInfo} = await getProducts(
		PRODUCTS_PER_PAGE,
		null,
		sortKey,
		reverse,
	);

	return (
		<ProductGrid
			initialProducts={products}
			initialCursor={pageInfo.endCursor}
			initialHasNextPage={pageInfo.hasNextPage}
		/>
	);
};

export default ProductFeed;
