import {Section, Typography} from '@/components/ui';
import {formatPrice} from '@/lib/shopify/helpers';
import {getProductByHandle} from '@/lib/shopify/products';
import {notFound} from 'next/navigation';
import ImageSlider from './ImageSlider';
import VariantSelector from './VariantSelector';

const PressOnNailsDetails = async ({
	params,
}: {
	params: Promise<{handle: string}>;
}) => {
	const {handle} = await params;

	const product = await getProductByHandle(handle);
	if (!product) notFound();

	const {title, description} = product;
	const {amount, currencyCode} = product.priceRange.minVariantPrice;
	const images = product.images.edges.map(({node}) => node);
	const variants = product.variants.edges.map(({node}) => node);

	return (
		<Section>
			<div className="container container-md">
				<div className="flex gap-16 max-lg:gap-9 max-md:flex-col max-md:gap-7">
					<div className="flex-1 min-w-0 overflow-hidden">
						<ImageSlider images={images} title={title} />
					</div>

					<div className="flex-1">
						<Typography className="mb-2" variant="h3">
							{title}
						</Typography>
						<Typography className="mb-7" variant="h4">
							{formatPrice(amount, currencyCode)}
						</Typography>

						<VariantSelector
							options={product.options}
							variants={variants}
						/>

						<div>
							<Typography className="mb-2" weight="normal" variant="h4">
								Description
							</Typography>
							<Typography>{description}</Typography>
						</div>
					</div>
				</div>
			</div>
		</Section>
	);
};

export default PressOnNailsDetails;
