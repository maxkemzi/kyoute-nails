'use client';

import {ProductCard} from '@/components/shop';
import {Button, ResponsiveIcon} from '@/components/ui';
import {
	getProducts,
	PRODUCTS_PER_PAGE,
	ShopifyProduct,
	sortMap,
} from '@/lib/shopify';
import {FlowerIcon} from '@phosphor-icons/react/dist/ssr';
import {useSearchParams} from 'next/navigation';
import {useState} from 'react';

interface Props {
	initialProducts: ShopifyProduct[];
	initialCursor: string | null;
	initialHasNextPage: boolean;
}

const ProductGrid = ({
	initialProducts,
	initialCursor,
	initialHasNextPage,
}: Props) => {
	const searchParams = useSearchParams();
	const sortParam = (searchParams.get('sort') ??
		'featured') as keyof typeof sortMap;
	const [products, setProducts] = useState(initialProducts);
	const [cursor, setCursor] = useState(initialCursor);
	const [hasNextPage, setHasNextPage] = useState(initialHasNextPage);
	const [isLoading, setIsLoading] = useState(false);

	const handleLoadMore = async () => {
		if (!cursor) return;

		setIsLoading(true);
		const {sortKey, reverse} = sortMap[sortParam];
		const {products: newProducts, pageInfo} = await getProducts(
			PRODUCTS_PER_PAGE,
			cursor,
			sortKey,
			reverse,
		);
		setProducts(prev => [...prev, ...newProducts]);
		setCursor(pageInfo.endCursor);
		setHasNextPage(pageInfo.hasNextPage);
		setIsLoading(false);
	};

	return (
		<>
			<div className="relative grid grid-cols-3 gap-7 max-lg:grid-cols-2 max-sm:grid-cols-1">
				{products.map(product => {
					return <ProductCard key={product.id} product={product} />;
				})}

				<ResponsiveIcon
					className="absolute top-1.5 left-0 -translate-1/2 rotate-90 -z-1 text-secondary"
					icon={FlowerIcon}
					weight="fill"
					size={100}
					mdSize={75}
					xsSize={50}
				/>

				<ResponsiveIcon
					className="absolute bottom-1.5 right-0 translate-1/2 rotate-12 -z-1 text-secondary"
					icon={FlowerIcon}
					weight="fill"
					size={70}
					mdSize={50}
					xsSize={35}
				/>
			</div>

			{hasNextPage ? (
				<div className="flex justify-center mt-7">
					<Button
						variant="outline"
						onClick={handleLoadMore}
						isDisabled={isLoading}
					>
						{isLoading ? 'Loading...' : 'Load more'}
					</Button>
				</div>
			) : null}
		</>
	);
};

export default ProductGrid;
