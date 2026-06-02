'use client';

import {ArrowButton} from '@/components/ui';
import {useLightbox} from '@/lib/lightboxContext';
import {ShopifyImage} from '@/lib/shopify/types';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import {useCallback, useEffect, useState} from 'react';
import {twJoin} from 'tailwind-merge';

interface Props {
	images: ShopifyImage[];
	title: string;
}

const ImageSlider = ({images, title}: Props) => {
	const [emblaRef, emblaApi] = useEmblaCarousel({loop: true});
	const [selectedIndex, setSelectedIndex] = useState(0);
	const {openLightbox} = useLightbox();
	const lightboxImages = images.map(img => ({
		url: img.url,
		altText: img.altText || title,
	}));

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
			<div
				className="h-189 relative rounded-3xl overflow-hidden cursor-zoom-in"
				onClick={() => openLightbox(lightboxImages, 0)}
			>
				<Image
					className="object-cover"
					fill
					src={images[0].url}
					alt={images[0].altText || title}
					priority
				/>
			</div>
		);
	}

	return (
		<div className="flex flex-col items-start gap-3">
			<div className="w-full relative rounded-3xl overflow-hidden">
				<ArrowButton
					className="absolute top-0 bottom-0 left-0 z-10 px-4 flex items-center"
					direction="left"
					onClick={scrollPrev}
					aria-label="Previous image"
				/>

				<div
					className="overflow-hidden h-189 cursor-zoom-in"
					ref={emblaRef}
					onClick={() => openLightbox(lightboxImages, selectedIndex)}
				>
					<div className="flex h-full">
						{images.map((image, index) => (
							<div key={index} className="flex-[0_0_100%] relative">
								<Image
									className="object-cover"
									fill
									src={image.url}
									alt={image.altText || title}
									priority={index === 0}
								/>
							</div>
						))}
					</div>
				</div>

				<ArrowButton
					className="absolute top-0 bottom-0 right-0 z-10 px-4 flex items-center"
					direction="right"
					onClick={scrollNext}
					aria-label="Next image"
				/>
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
							className="object-cover"
							src={image.url}
							fill
							alt={image.altText || title}
						/>
					</button>
				))}
			</div>
		</div>
	);
};

export default ImageSlider;
