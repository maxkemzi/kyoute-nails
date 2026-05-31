export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest';

export const sortMap: Record<SortOption, {sortKey: string; reverse: boolean}> =
	{
		featured: {
			sortKey: 'BEST_SELLING',
			reverse: false,
		},
		'price-asc': {
			sortKey: 'PRICE',
			reverse: false,
		},
		'price-desc': {
			sortKey: 'PRICE',
			reverse: true,
		},
		newest: {
			sortKey: 'CREATED_AT',
			reverse: true,
		},
	};
