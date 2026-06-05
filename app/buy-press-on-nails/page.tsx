import {Section, Typography} from '@/components/ui';
import {getProducts, PRODUCTS_PER_PAGE, sortMap} from '@/lib/shopify';
import ProductGrid from './ProductGrid';
import SortDropdown from './SortDropdown';

const BuyPressOnNails = async ({
	searchParams,
}: {
	searchParams: Promise<{sort?: string}>;
}) => {
	const sortParam = ((await searchParams).sort ??
		'featured') as keyof typeof sortMap;

	const {sortKey, reverse} = sortMap[sortParam];

	const {products, pageInfo} = await getProducts(
		PRODUCTS_PER_PAGE,
		null,
		sortKey,
		reverse,
	);

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
					key={sortParam}
					initialProducts={products}
					initialCursor={pageInfo.endCursor}
					initialHasNextPage={pageInfo.hasNextPage}
				/>
			</div>
		</Section>
	);
};

export default BuyPressOnNails;
