const ReviewsSectionSkeleton = () => {
	return (
		<div>
			{/* Title + rating */}
			<div className="flex items-center gap-4 mb-4">
				<div className="h-6 w-24 rounded-lg bg-surface animate-pulse" />
				<div className="h-5 w-40 rounded-md bg-surface animate-pulse" />
			</div>

			{/* Review cards */}
			<div className="flex flex-col gap-4">
				{Array.from({length: 2}).map((_, i) => (
					<div
						key={i}
						className="flex flex-col gap-2 p-4 shadow-border rounded-2xl"
					>
						<div className="flex items-center justify-between gap-4">
							<div className="h-6 w-28 rounded-md bg-surface animate-pulse" />
							<div className="h-4 w-22 rounded-md bg-surface animate-pulse" />
						</div>
						<div className="h-12.5 w-full rounded-lg bg-surface animate-pulse" />
						<div className="h-5 w-20 rounded-md bg-surface animate-pulse" />
					</div>
				))}
			</div>
		</div>
	);
};

export default ReviewsSectionSkeleton;
