'use client';

import useEmblaCarousel from 'embla-carousel-react';
import {useTranslations} from 'next-intl';
import Image from 'next/image';
import {useCallback, useEffect} from 'react';
import {X} from 'react-feather';
import {twMerge} from 'tailwind-merge';
import {ArrowButton} from './ui';
import {FocusTrap} from 'focus-trap-react';

interface LightboxImage {
	url: string;
	altText?: string;
}

interface Props {
	images: LightboxImage[];
	initialIndex?: number;
	isOpen: boolean;
	onClose: () => void;
}

const Lightbox = ({images, initialIndex = 0, isOpen, onClose}: Props) => {
	const t = useTranslations('Lightbox');
	const tImageSlider = useTranslations('imageSlider');
	const [emblaRef, emblaApi] = useEmblaCarousel({
		loop: true,
		startIndex: initialIndex,
	});

	const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
	const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

	useEffect(() => {
		document.body.style.overflow = isOpen ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	}, [isOpen]);

	return (
		<FocusTrap
			active={isOpen}
			focusTrapOptions={{
				onDeactivate: onClose,
				clickOutsideDeactivates: false,
				escapeDeactivates: true,
			}}
		>
			<div
				className={twMerge(
					'fixed inset-0 z-50 bg-black/50 flex items-center justify-center transition-opacity',
					isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
				)}
				aria-hidden={!isOpen}
			>
				{/* Close button */}
				<button
					onClick={onClose}
					className="absolute top-4 right-4 z-20 size-12 flex items-center justify-center cursor-pointer rounded-full bg-background/60 hover:bg-background/80 text-background-foreground hover:text-primary transition-colors"
					aria-label={t('closeGallery')}
					type="button"
				>
					<X size={24} />
				</button>

				{/* Slider */}
				<div
					className={twMerge(
						'relative w-full',
						isOpen ? 'pointer-events-auto' : 'pointer-events-none',
					)}
					onClick={e => e.stopPropagation()}
				>
					{images.length > 1 ? (
						<ArrowButton
							className="absolute top-0 bottom-0 left-0 pl-12 pr-4 z-10 flex items-center max-md:pl-8 max-xs:pl-4"
							direction="left"
							onClick={scrollPrev}
							aria-label={tImageSlider('previousImage')}
						/>
					) : null}

					<div className="overflow-hidden h-[90vh]" ref={emblaRef}>
						<div className="flex h-full">
							{images.map((image, index) => (
								<div
									key={image.url}
									className="flex-[0_0_100%] relative"
								>
									<Image
										className="object-contain"
										fill
										src={image.url}
										alt={image.altText ?? `Image ${index + 1}`}
										fetchPriority={
											index === initialIndex ? 'high' : 'auto'
										}
										loading={
											index === initialIndex ? 'eager' : 'lazy'
										}
										sizes="100vw"
									/>
								</div>
							))}
						</div>
					</div>

					{images.length > 1 ? (
						<ArrowButton
							className="absolute top-0 bottom-0 right-0 pr-12 pl-4 z-10 flex items-center max-md:pr-8 max-xs:pr-4"
							direction="right"
							onClick={scrollNext}
							aria-label={tImageSlider('nextImage')}
						/>
					) : null}
				</div>
			</div>
		</FocusTrap>
	);
};

export default Lightbox;
