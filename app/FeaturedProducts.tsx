'use client';

import {ResponsiveIcon} from '@/components/ui';
import {ShopifyProduct} from '@/lib/shopify';
import {FlowerIcon} from '@phosphor-icons/react';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import Link from 'next/link';
import {useCallback, useEffect, useState} from 'react';
import {twMerge} from 'tailwind-merge';

interface Props {
	products: ShopifyProduct[];
}

const FeaturedProducts = ({products}: Props) => {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [emblaRef, emblaApi] = useEmblaCarousel(
		{loop: true, slidesToScroll: 1, align: 'start'},
		[
			Autoplay({
				delay: 3000,
				stopOnMouseEnter: false,
				stopOnInteraction: false,
			}),
		],
	);

	const onSelect = useCallback(() => {
		if (!emblaApi) return;
		setSelectedIndex(emblaApi.selectedScrollSnap() % products.length);
	}, [emblaApi, products.length]);

	useEffect(() => {
		if (!emblaApi) return;
		emblaApi.on('select', onSelect);
		return () => {
			emblaApi.off('select', onSelect);
		};
	}, [emblaApi, onSelect]);

	const loopedProducts = [...products, ...products, ...products];

	return (
		<div className="relative">
			{/* Grid */}
			<div className="flex items-center gap-7 max-md:hidden max-lg:gap-4">
				{products.map(p => {
					const {id, handle, title} = p;
					const image = p.images.edges[0].node;
					return (
						<Link
							key={id}
							className="relative flex-1/3 h-125 rounded-3xl overflow-hidden max-lg:h-112.5"
							href={`/buy-press-on-nails/${handle}`}
						>
							<Image
								className="object-cover"
								fill
								src={image.url}
								alt={image.altText || title}
							/>
						</Link>
					);
				})}
			</div>

			{/* Slider */}
			<div className="hidden max-md:block">
				<div className="overflow-hidden rounded-3xl" ref={emblaRef}>
					<div className="flex">
						{loopedProducts.map((p, i) => (
							<div
								key={`${p.id}-${i}`}
								className="flex-[0_0_calc(50%-6px)] ml-3 max-xs:flex-[0_0_100%]"
							>
								<Link
									href={`/buy-press-on-nails/${p.handle}`}
									className="relative block h-112.5 rounded-3xl overflow-hidden max-md:h-100"
								>
									<Image
										className="object-cover"
										fill
										src={p.images.edges[0].node.url}
										alt={p.title}
									/>
								</Link>
							</div>
						))}
					</div>
				</div>

				<div className="flex justify-center gap-2 mt-3">
					{products.map((_, index) => (
						<button
							key={index}
							onClick={() => emblaApi?.scrollTo(index)}
							className={twMerge(
								'size-2 border rounded-full transition-colors',
								selectedIndex === index
									? 'bg-primary border-primary'
									: 'bg-background border-border',
							)}
						/>
					))}
				</div>
			</div>

			<ResponsiveIcon
				className="absolute top-1.5 left-0 -translate-1/2 -z-1 text-secondary"
				icon={FlowerIcon}
				weight="fill"
				size={100}
				mdSize={75}
				xsSize={50}
			/>

			<ResponsiveIcon
				className="absolute bottom-1.5 right-0 translate-1/2 -z-1 text-secondary max-md:bottom-6.5"
				icon={FlowerIcon}
				weight="fill"
				size={70}
				mdSize={50}
				xsSize={35}
			/>
		</div>
	);
};

export default FeaturedProducts;
