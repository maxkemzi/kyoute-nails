'use client';

import {Lightbox} from '@/components/Lightbox';
import {
	ReactNode,
	useState,
	useCallback,
	useContext,
	createContext,
} from 'react';

interface LightboxImage {
	url: string;
	altText?: string;
}

interface LightboxContextValue {
	openLightbox: (images: LightboxImage[], index?: number) => void;
	closeLightbox: () => void;
}

const LightboxContext = createContext<LightboxContextValue | null>(null);

export const LightboxProvider = ({children}: {children: ReactNode}) => {
	const [images, setImages] = useState<LightboxImage[]>([]);
	const [index, setIndex] = useState(0);
	const [isOpen, setIsOpen] = useState(false);

	const openLightbox = useCallback((imgs: LightboxImage[], startIndex = 0) => {
		setImages(imgs);
		setIndex(startIndex);
		setIsOpen(true);
	}, []);

	const closeLightbox = useCallback(() => setIsOpen(false), []);

	return (
		<LightboxContext value={{openLightbox, closeLightbox}}>
			{children}
			<Lightbox
				images={images}
				initialIndex={index}
				isOpen={isOpen}
				onClose={closeLightbox}
			/>
		</LightboxContext>
	);
};

export const useLightbox = () => {
	const ctx = useContext(LightboxContext);
	if (!ctx) {
		throw new Error('useLightbox must be used inside LightboxProvider');
	}
	return ctx;
};
