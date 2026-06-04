'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import {useCallback, useEffect} from 'react';
import {X} from 'react-feather';
import {twMerge} from 'tailwind-merge';
import {ArrowButton} from '../ui';

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
	const [emblaRef, emblaApi] = useEmblaCarousel({
		loop: true,
		startIndex: initialIndex,
	});

	const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
	const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

	// Close on Escape
	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [onClose]);

	// Lock scroll
	useEffect(() => {
		document.body.style.overflow = isOpen ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	}, [isOpen]);

	return (
		<div
			className={twMerge(
				'fixed inset-0 z-50 bg-black/50 flex items-center justify-center transition-[opacity,visibility]',
				isOpen ? 'opacity-100 visible' : 'opacity-0 invisible',
			)}
		>
			{/* Close button */}
			<button
				onClick={onClose}
				className="absolute top-4 right-4 z-20 size-12 flex items-center justify-center rounded-full bg-background/60 hover:bg-background/80 text-background-foreground hover:text-primary transition-colors"
				aria-label="Close"
			>
				<X size={24} />
			</button>

			{/* Slider */}
			<div
				className="relative w-full pointer-events-auto"
				onClick={e => e.stopPropagation()}
			>
				{images.length > 1 ? (
					<ArrowButton
						className="absolute top-0 bottom-0 left-0 pl-12 pr-4 z-10 flex items-center max-md:pl-8 max-xs:pl-4"
						direction="left"
						onClick={scrollPrev}
						aria-label="Previous image"
					/>
				) : null}

				<div className="overflow-hidden h-[90vh]" ref={emblaRef}>
					<div className="flex h-full">
						{images.map((image, index) => (
							<div key={index} className="flex-[0_0_100%] relative">
								<Image
									className="object-contain"
									fill
									src={image.url}
									alt={image.altText ?? `Image ${index + 1}`}
									priority={index === 0}
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
						aria-label="Next image"
					/>
				) : null}
			</div>
		</div>
	);
};

export default Lightbox;
