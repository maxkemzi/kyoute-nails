'use client';

import {ShopifyProduct} from '@/lib/shopify/types';
import useEmblaCarousel from 'embla-carousel-react';
import Link from 'next/link';
import Image from 'next/image';
import {FlowerIcon} from '@phosphor-icons/react';
import Autoplay from 'embla-carousel-autoplay';
import {ResponsiveIcon} from '@/components/ui';

interface Props {
	products: ShopifyProduct[];
}

const FeaturedProducts = ({products}: Props) => {
	const [emblaRef] = useEmblaCarousel(
		{loop: true, slidesToScroll: 1, align: 'start'},
		[
			Autoplay({
				delay: 3000,
				stopOnMouseEnter: true,
			}),
		],
	);

	const loopedProducts = [...products, ...products, ...products];

	return (
		<div className="relative">
			{/* Grid */}
			<div className="flex items-center gap-7 max-md:hidden">
				{products.map(p => {
					const {id, handle, title} = p;
					const image = p.images.edges[0].node;
					return (
						<Link
							key={id}
							className="relative flex-1/3 h-125 rounded-3xl overflow-hidden"
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
			<div className="hidden max-md:block overflow-hidden" ref={emblaRef}>
				<div className="flex">
					{loopedProducts.map((p, i) => (
						<div
							key={`${p.id}-${i}`}
							className="flex-[0_0_calc(50%-6px)] ml-3 max-sm:flex-[0_0_100%]"
						>
							<Link
								href={`/buy-press-on-nails/${p.handle}`}
								className="relative block h-125 rounded-3xl overflow-hidden"
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

			<ResponsiveIcon
				className="absolute top-1.5 left-0 -translate-1/2 -z-1 text-secondary"
				icon={FlowerIcon}
				weight="fill"
				size={100}
				mdSize={75}
				xsSize={50}
			/>

			<ResponsiveIcon
				className="absolute bottom-1.5 right-0 translate-1/2 -z-1 text-secondary"
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
