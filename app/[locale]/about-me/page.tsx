import {DoubleLeafIcon} from '@/components/icons';
import {ResponsiveIcon, Section, Typography} from '@/components/ui';
import {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';
import Image from 'next/image';

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
					<div className="relative grid grid-cols-6 gap-4 max-md:grid-cols-2 max-xs:grid-cols-1">
						<div className="col-span-3 bg-surface h-62.5 rounded-3xl max-md:col-span-1" />
						<div className="col-span-3 bg-surface h-62.5 rounded-3xl max-md:col-span-1" />
						<div className="col-span-2 bg-surface h-62.5 rounded-3xl max-md:col-span-1" />
						<div className="col-span-2 bg-surface h-62.5 rounded-3xl max-md:col-span-1" />
						<div className="col-span-2 bg-surface h-62.5 rounded-3xl max-md:col-span-1" />

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
				</div>
			</div>
		</Section>
	);
};

export default AboutMe;
