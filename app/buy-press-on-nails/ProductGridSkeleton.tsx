import {ResponsiveIcon} from '@/components/ui';
import {PRODUCTS_PER_PAGE} from '@/lib/shopify';
import {FlowerIcon} from '@phosphor-icons/react/ssr';

const ProductGridSkeleton = () => {
	return (
		<div className="relative grid grid-cols-3 gap-7 max-lg:grid-cols-2 max-sm:grid-cols-1">
			{Array.from({length: PRODUCTS_PER_PAGE}).map((_, i) => (
				<div
					key={i}
					className="h-125 rounded-3xl shadow-border bg-surface animate-pulse max-lg:h-112.5 max-md:h-100"
				/>
			))}

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
	);
};

export default ProductGridSkeleton;
