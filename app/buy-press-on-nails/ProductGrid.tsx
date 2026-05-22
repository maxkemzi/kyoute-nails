'use client';

import {ShopifyProduct} from '@/lib/shopify/types';
import {useState} from 'react';
import Image from 'next/image';
import {NailsCard} from '@/components';
import {getProducts} from '@/lib/shopify/products';
import {Button} from '@/components/ui';
import {PRODUCTS_PER_PAGE} from '@/lib/shopify/constants';

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
	const [products, setProducts] = useState(initialProducts);
	const [cursor, setCursor] = useState(initialCursor);
	const [hasNextPage, setHasNextPage] = useState(initialHasNextPage);
	const [isLoading, setIsLoading] = useState(false);

	const handleLoadMore = async () => {
		if (!cursor) return;

		setIsLoading(true);
		const {products: newProducts, pageInfo} = await getProducts(
			PRODUCTS_PER_PAGE,
			cursor,
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
					return <NailsCard key={product.id} product={product} />;
				})}

				<Image
					className="absolute top-1.5 left-0 -translate-1/2 rotate-90 -z-1"
					width={100}
					height={100}
					src="/flower.svg"
					alt="flower"
				/>

				<Image
					className="absolute bottom-1.5 right-0 translate-1/2 rotate-12 -z-1"
					width={70}
					height={70}
					src="/flower.svg"
					alt="flower"
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
