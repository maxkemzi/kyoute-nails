import {DoubleLeafIcon} from '@/components/icons';
import {ResponsiveIcon, Section, Typography} from '@/components/ui';
import {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';
import Image from 'next/image';
import CertificateGrid from './CertificateGrid';

export const generateMetadata = async ({
	params,
}: {
	params: Promise<{locale: string}>;
}): Promise<Metadata> => {
	const {locale} = await params;
	const t = await getTranslations({locale, namespace: 'AboutMe'});

	return {
		title: t('meta.title'),
		description: t('meta.description'),
	};
};

const AboutMe = async () => {
	const t = await getTranslations('AboutMe');

	return (
		<Section>
			<div className="container container-sm">
				<div className="flex items-center gap-7 mb-9 max-md:flex-col max-md:items-start">
					<Image
						className="shrink-0 h-auto object-contain rounded-3xl max-md:self-center"
						width={300}
						height={309}
						src="/portrait.jpg"
						alt={t('myPortrait')}
						fetchPriority="high"
						loading="eager"
					/>
					<div>
						<Typography className="mb-4" variant="h2">
							{t('title')}
						</Typography>
						<Typography className="mb-2">{t('description1')}</Typography>
						<Typography>{t('description2')}</Typography>
					</div>
				</div>

				<div>
					<Typography className="mb-6" variant="h3" weight="bold">
						{t('certificates')}
					</Typography>
					<CertificateGrid />
				</div>
			</div>
		</Section>
	);
};

export default AboutMe;
