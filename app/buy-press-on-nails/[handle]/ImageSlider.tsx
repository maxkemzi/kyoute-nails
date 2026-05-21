'use client';

import {ShopifyImage} from '@/lib/shopify/types';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import {useCallback, useEffect, useState} from 'react';
import {ChevronLeft, ChevronRight} from 'react-feather';
import {twJoin, twMerge} from 'tailwind-merge';

interface Props {
	images: ShopifyImage[];
	title: string;
}

const ArrowButton = ({
	direction,
	onClick,
}: {
	direction: 'prev' | 'next';
	onClick: () => void;
}) => {
	return (
		<button
			onClick={onClick}
			className={twJoin(
				'absolute top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full text-background-foreground hover:text-primary bg-background/60 hover:bg-background/80 shadow-sm transition-colors disabled:opacity-30 disabled:cursor-not-allowed',
				direction === 'prev' ? 'left-4' : 'right-4',
			)}
			aria-label={direction === 'prev' ? 'Previous image' : 'Next image'}
		>
			{direction === 'prev' ? (
				<ChevronLeft size={24} />
			) : (
				<ChevronRight size={24} />
			)}
		</button>
	);
};

const ImageSlider = ({images, title}: Props) => {
	const [emblaRef, emblaApi] = useEmblaCarousel({loop: true});
	const [selectedIndex, setSelectedIndex] = useState(0);

	const onSelect = useCallback(() => {
		if (!emblaApi) return;
		setSelectedIndex(emblaApi.selectedScrollSnap());
	}, [emblaApi]);

	useEffect(() => {
		if (!emblaApi) return;
		emblaApi.on('select', onSelect);
		return () => {
			emblaApi.off('select', onSelect);
		};
	}, [emblaApi, onSelect]);

	const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
	const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
	const scrollTo = useCallback(
		(index: number) => emblaApi?.scrollTo(index),
		[emblaApi],
	);

	if (images.length === 1) {
		return (
			<div className="rounded-3xl overflow-hidden">
				<Image
					className="w-full h-auto object-contain"
					width={600}
					height={756}
					src={images[0].url}
					alt={images[0].altText || title}
					priority
				/>
			</div>
		);
	}

	return (
		<div className="flex flex-col items-start gap-3">
			<div className="relative rounded-3xl overflow-hidden">
				<ArrowButton direction="prev" onClick={scrollPrev} />

				<div className="overflow-hidden" ref={emblaRef}>
					<div className="flex">
						{images.map((image, index) => (
							<div key={index} className="flex-[0_0_100%]">
								<Image
									className="w-full h-auto object-contain"
									width={600}
									height={756}
									src={image.url}
									alt={image.altText || title}
									priority={index === 0}
								/>
							</div>
						))}
					</div>
				</div>

				<ArrowButton direction="next" onClick={scrollNext} />
			</div>

			{/* Thumbnails */}
			<div className="w-full flex gap-3 overflow-x-auto scrollbar-none">
				{images.map((image, index) => (
					<button
						key={index}
						onClick={() => scrollTo(index)}
						className={twJoin(
							'relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-colors',
							selectedIndex === index
								? 'border-primary'
								: 'border-transparent transition-opacity opacity-60 hover:opacity-100',
						)}
					>
						<Image
							src={image.url}
							fill
							style={{objectFit: 'cover'}}
							alt={image.altText || title}
						/>
					</button>
				))}
			</div>
		</div>
	);
};

export default ImageSlider;
