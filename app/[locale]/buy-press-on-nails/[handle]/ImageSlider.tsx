'use client';

import {ArrowButton} from '@/components/ui';
import {useLightbox} from '@/lib/lightbox';
import {ShopifyImage} from '@/lib/shopify';
import useEmblaCarousel from 'embla-carousel-react';
import {useTranslations} from 'next-intl';
import Image from 'next/image';
import {useCallback, useEffect, useState} from 'react';
import {twJoin} from 'tailwind-merge';

interface Props {
	images: ShopifyImage[];
	title: string;
}

const ImageSlider = ({images, title}: Props) => {
	const t = useTranslations('imageSlider');
	const tLightbox = useTranslations('Lightbox');
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
			<button
				className="w-full h-189 relative rounded-3xl overflow-hidden cursor-zoom-in max-lg:h-164 max-md:h-139 max-xs:h-114"
				onClick={() => openLightbox(lightboxImages, 0)}
				aria-label={tLightbox('openGallery')}
				type="button"
			>
				<Image
					className="object-cover"
					fill
					src={images[0].url}
					alt={images[0].altText || title}
					fetchPriority="high"
					loading="eager"
				/>
			</button>
		);
	}

	return (
		<div className="flex flex-col items-start gap-3 max-md:gap-2">
			<div className="w-full relative rounded-3xl overflow-hidden">
				<ArrowButton
					className="absolute top-0 bottom-0 left-0 z-10 px-4 flex items-center"
					direction="left"
					onClick={scrollPrev}
					aria-label={t('previousImage')}
				/>

				<button
					className="w-full overflow-hidden h-189 cursor-zoom-in max-lg:h-164 max-md:h-139 max-xs:h-114"
					ref={emblaRef}
					onClick={() => openLightbox(lightboxImages, selectedIndex)}
					aria-label={tLightbox('openGallery')}
					type="button"
				>
					<div className="flex h-full">
						{images.map((image, index) => (
							<div key={index} className="flex-[0_0_100%] relative">
								<Image
									className="object-cover"
									fill
									src={image.url}
									alt={image.altText || title}
									fetchPriority={index === 0 ? 'high' : 'auto'}
									loading={index === 0 ? 'eager' : 'lazy'}
								/>
							</div>
						))}
					</div>
				</button>

				<ArrowButton
					className="absolute top-0 bottom-0 right-0 z-10 px-4 flex items-center"
					direction="right"
					onClick={scrollNext}
					aria-label={t('nextImage')}
				/>
			</div>

			{/* Thumbnails */}
			<div className="w-full flex gap-3 overflow-x-auto scrollbar-none max-md:gap-2">
				{images.map((image, index) => (
					<button
						key={index}
						onClick={() => scrollTo(index)}
						className={twJoin(
							'relative size-20 rounded-xl overflow-hidden shrink-0 border-2 cursor-pointer transition-colors max-md:size-18 max-xs:size-16',
							selectedIndex === index
								? 'border-primary'
								: 'border-transparent transition-opacity opacity-60 hover:opacity-100',
						)}
						aria-label={t('goToImage', {number: index + 1})}
						aria-current={selectedIndex === index ? 'true' : undefined}
					>
						<Image
							className="object-cover"
							src={image.url}
							fill
							alt={image.altText || title}
							fetchPriority="high"
							loading="eager"
						/>
					</button>
				))}
			</div>
		</div>
	);
};

export default ImageSlider;
