import {Section, Typography} from '@/components/ui';
import {getProducts} from '@/lib/shopify/products';
import ProductGrid from './ProductGrid';
import SortDropdown from './SortDropdown';
import {PRODUCTS_PER_PAGE} from '@/lib/shopify/constants';

const BuyPressOnNails = async () => {
	const {products, pageInfo} = await getProducts(PRODUCTS_PER_PAGE);

	return (
		<Section>
			<div className="container container-md">
				<Typography
					className="text-center mb-9"
					variant="h2"
					textTransform="capitalize"
				>
					Buy Press-On Nails
				</Typography>
				<div className="flex justify-end mb-7">
					<SortDropdown />
				</div>
				<ProductGrid
					initialProducts={products}
					initialCursor={pageInfo.endCursor}
					initialHasNextPage={pageInfo.hasNextPage}
				/>
			</div>
		</Section>
	);
};

export default BuyPressOnNails;
