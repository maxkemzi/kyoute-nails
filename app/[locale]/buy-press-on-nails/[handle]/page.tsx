import {Section} from '@/components/ui';
import {Suspense} from 'react';
import ProductInfo from './ProductInfo';
import ProductInfoSkeleton from './ProductInfoSkeleton';

const PressOnNailsDetails = async ({
	params,
}: {
	params: Promise<{handle: string; locale: string}>;
}) => {
	const {handle, locale} = await params;

	return (
		<Section>
			<div className="container container-md">
				<Suspense fallback={<ProductInfoSkeleton />}>
					<ProductInfo handle={handle} locale={locale} />
				</Suspense>
			</div>
		</Section>
	);
};

export default PressOnNailsDetails;
