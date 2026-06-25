'use client';

import {useTranslations} from 'next-intl';
import Image from 'next/image';

interface Props {
	onClick: () => void;
	src: string;
	alt: string;
	index: number;
}

const CertificateItem = ({onClick, src, alt, index}: Props) => {
	const t = useTranslations('Lightbox');
	return (
		<button
			aria-label={t('openGallery')}
			className="relative block w-full aspect-7/5 rounded-3xl overflow-hidden cursor-zoom-in"
			onClick={onClick}
			type="button"
		>
			<Image
				className="object-cover"
				src={src}
				fill
				alt={alt}
				sizes="(max-width: 480px) 100vw, (max-width: 768px) 375px, 425px"
				fetchPriority={index < 3 ? 'high' : 'auto'}
				loading={index < 3 ? 'eager' : 'lazy'}
			/>
		</button>
	);
};

export default CertificateItem;
