'use client';

import {DoubleLeafIcon} from '@/components/icons';
import {ArrowButton, ResponsiveIcon} from '@/components/ui';
import {useLightbox} from '@/lib/lightbox';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import {useCallback, useEffect, useState} from 'react';
import CertificateItem from './CertificateItem';
import {twMerge} from 'tailwind-merge';
import {useTranslations} from 'next-intl';

const CERTIFICATES = [
	{
		url: '/certificate-1.jpg',
		altText:
			'CNI Hardware Manicure Basic Course certificate — Yuliana Bondarchuk',
	},
	{
		url: '/certificate-2.jpg',
		altText:
			'CNI Nail Modelling Gel Technology certificate — Yuliana Bondarchuk',
	},
	{
		url: '/certificate-3.jpg',
		altText: 'CNI Manicure Course certificate — Yuliana Bondarchuk',
	},
	{
		url: '/certificate-4.jpg',
		altText:
			'CNI Hardware Pedicure Basic Course certificate — Yuliana Bondarchuk',
	},
	{
		url: '/certificate-5.jpg',
		altText: 'CNI Pedicure Course certificate — Yuliana Bondarchuk',
	},
];

const CertificateGrid = () => {
	const t = useTranslations('imageSlider');
	const {openLightbox} = useLightbox();
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [emblaRef, emblaApi] = useEmblaCarousel(
		{
			align: 'start',
			loop: true,
		},
		[
			Autoplay({
				delay: 3000,
				stopOnMouseEnter: true,
				stopOnInteraction: false,
			}),
		],
	);

	const onSelect = useCallback(() => {
		if (!emblaApi) return;
		setSelectedIndex(emblaApi.selectedScrollSnap() % CERTIFICATES.length);
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

	return (
		<div>
			<div className="relative">
				<ArrowButton
					aria-label={t('previousImage')}
					className="absolute top-0 bottom-0 left-0 z-10 px-4 flex items-center max-md:hidden"
					direction="left"
					onClick={scrollPrev}
				/>
				<div className="overflow-hidden rounded-3xl" ref={emblaRef}>
					<div className="flex -ml-4 max-md:-ml-3">
						{CERTIFICATES.map((cert, index) => (
							<div
								key={index}
								className="flex-[0_0_425px] pl-4 max-md:flex-[0_0_375px] max-xs:flex-[0_0_100%] max-md:pl-3"
							>
								<CertificateItem
									onClick={() => openLightbox(CERTIFICATES, index)}
									src={cert.url}
									alt={cert.altText}
									index={index}
								/>
							</div>
						))}
					</div>
				</div>
				<ArrowButton
					aria-label={t('nextImage')}
					className="absolute top-0 bottom-0 right-0 z-10 px-4 flex items-center max-md:hidden"
					direction="right"
					onClick={scrollNext}
				/>

				<ResponsiveIcon
					className="absolute -top-1 right-1 -translate-y-1/2 translate-x-1/2 -scale-x-100 -rotate-100 -z-1 text-leaf"
					icon={DoubleLeafIcon}
					size={40}
					mdSize={36}
					xsSize={32}
				/>

				<ResponsiveIcon
					className="absolute -bottom-1 left-1 translate-y-1/2 -translate-x-1/2 -z-1 text-leaf"
					icon={DoubleLeafIcon}
					size={40}
					mdSize={36}
					xsSize={32}
				/>
			</div>

			<div className="hidden justify-center mt-1 -mb-2 max-md:flex">
				{CERTIFICATES.map((_, index) => (
					// TODO: move dots to a separate component
					<button
						key={index}
						onClick={() => emblaApi?.scrollTo(index)}
						className="flex items-center justify-center p-2 cursor-pointer"
						aria-label={t('goToImage', {number: index + 1})}
						aria-current={selectedIndex === index ? 'true' : undefined}
					>
						<span
							className={twMerge(
								'size-2.5 rounded-full border transition-colors',
								selectedIndex === index
									? 'bg-primary border-primary'
									: 'bg-background border-border',
							)}
						/>
					</button>
				))}
			</div>
		</div>
	);
};

export default CertificateGrid;
