const ProductInfoSkeleton = () => {
	return (
		<div className="flex gap-16 max-lg:gap-9 max-md:flex-col max-md:gap-7">
			{/* Image */}
			<div className="flex-1 min-w-0 overflow-hidden">
				<div className="w-full h-189 rounded-3xl bg-surface animate-pulse max-lg:h-164 max-md:h-139 max-xs:h-114" />
			</div>

			{/* Details */}
			<div className="flex-1">
				{/* Title */}
				<div className="h-9 w-3/4 rounded-xl bg-surface animate-pulse mb-2" />

				{/* Price */}
				<div className="h-7 w-24 rounded-lg bg-surface animate-pulse mb-7" />

				{/* Add to cart button */}
				<div className="h-12 w-40 rounded-xl bg-surface animate-pulse mb-9" />

				{/* Description */}
				<div>
					<div className="h-8 w-32 rounded-xl bg-surface animate-pulse mb-2" />
					<div className="h-24 w-full rounded-xl bg-surface animate-pulse" />
				</div>
			</div>
		</div>
	);
};

export default ProductInfoSkeleton;
