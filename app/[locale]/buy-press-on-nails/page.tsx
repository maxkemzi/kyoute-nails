import {Section, Typography} from '@/components/ui';
import {sortMap} from '@/lib/shopify';
import {getTranslations} from 'next-intl/server';
import {Suspense} from 'react';
import ProductFeed from './ProductFeed';
import ProductGridSkeleton from './ProductGridSkeleton';
import SortDropdown from './SortDropdown';

const BuyPressOnNails = async ({
	searchParams,
}: {
	searchParams: Promise<{sort?: string}>;
}) => {
	const t = await getTranslations('BuyPressOnNails');

	const sortParam = ((await searchParams).sort ??
		'featured') as keyof typeof sortMap;

	return (
		<Section>
			<div className="container container-md">
				<Typography
					className="text-center mb-9"
					variant="h2"
					textTransform="capitalize"
				>
					{t('title')}
				</Typography>
				<div className="flex justify-end mb-7">
					<SortDropdown />
				</div>
				<Suspense key={sortParam} fallback={<ProductGridSkeleton />}>
					<ProductFeed sortParam={sortParam} />
				</Suspense>
			</div>
		</Section>
	);
};

export default BuyPressOnNails;
