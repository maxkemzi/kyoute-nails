import {Section, Typography} from '@/components/ui';
import {getTranslations} from 'next-intl/server';
import {Metadata} from 'next';

export async function generateMetadata({
	params,
}: {
	params: Promise<{locale: string}>;
}): Promise<Metadata> {
	const {locale} = await params;
	const t = await getTranslations({locale, namespace: 'TermsAndConditions'});

	return {title: t('meta.title'), description: t('meta.description')};
}

const TermsAndConditions = async () => {
	const t = await getTranslations('TermsAndConditions');

	return (
		<Section>
			<div className="container container-xs">
				<Typography className="mb-9 text-center" variant="h2">
					{t('title')}
				</Typography>

				<div className="flex flex-col gap-7">
					<div>
						<Typography className="mb-1" variant="h4">
							{t('introduction.title')}
						</Typography>
						<Typography>{t('introduction.body')}</Typography>
					</div>

					<div>
						<Typography className="mb-1" variant="h4">
							{t('orders.title')}
						</Typography>
						<Typography>{t('orders.body')}</Typography>
					</div>

					<div>
						<Typography className="mb-1" variant="h4">
							{t('pricing.title')}
						</Typography>
						<Typography>{t('pricing.body')}</Typography>
					</div>

					<div>
						<Typography className="mb-1" variant="h4">
							{t('intellectualProperty.title')}
						</Typography>
						<Typography>{t('intellectualProperty.body')}</Typography>
					</div>

					<div>
						<Typography className="mb-1" variant="h4">
							{t('userConduct.title')}
						</Typography>
						<Typography>{t('userConduct.body')}</Typography>
					</div>

					<div>
						<Typography className="mb-1" variant="h4">
							{t('liability.title')}
						</Typography>
						<Typography>{t('liability.body')}</Typography>
					</div>

					<div>
						<Typography className="mb-1" variant="h4">
							{t('changes.title')}
						</Typography>
						<Typography>{t('changes.body')}</Typography>
					</div>

					<div>
						<Typography className="mb-1" variant="h4">
							{t('governingLaw.title')}
						</Typography>
						<Typography>{t('governingLaw.body')}</Typography>
					</div>

					<div>
						<Typography className="mb-1" variant="h4">
							{t('contact.title')}
						</Typography>
						<Typography>{t('contact.body')}</Typography>
					</div>
				</div>
			</div>
		</Section>
	);
};

export default TermsAndConditions;
