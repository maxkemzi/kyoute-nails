import {Section, Typography} from '@/components/ui';
import {getTranslations} from 'next-intl/server';
import {Metadata} from 'next';

export async function generateMetadata({
	params,
}: {
	params: Promise<{locale: string}>;
}): Promise<Metadata> {
	const {locale} = await params;
	const t = await getTranslations({locale, namespace: 'PrivacyPolicy'});

	return {title: t('meta.title'), description: t('meta.description')};
}

const PrivacyPolicy = async () => {
	const t = await getTranslations('PrivacyPolicy');

	return (
		<Section>
			<div className="container container-xs">
				<Typography className="mb-9 text-center" variant="h2">
					<span className="max-xs:hidden">{t('title')}</span>
					<span className="hidden max-xs:inline">{t('titleShort')}</span>
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
							{t('dataCollected.title')}
						</Typography>
						<Typography>{t('dataCollected.body')}</Typography>
					</div>

					<div>
						<Typography className="mb-1" variant="h4">
							{t('howWeUseData.title')}
						</Typography>
						<Typography>{t('howWeUseData.body')}</Typography>
					</div>

					<div>
						<Typography className="mb-1" variant="h4">
							{t('thirdParties.title')}
						</Typography>
						<Typography>{t('thirdParties.body')}</Typography>
					</div>

					<div>
						<Typography className="mb-1" variant="h4">
							{t('cookies.title')}
						</Typography>
						<Typography>{t('cookies.body')}</Typography>
					</div>

					<div>
						<Typography className="mb-1" variant="h4">
							{t('dataRetention.title')}
						</Typography>
						<Typography>{t('dataRetention.body')}</Typography>
					</div>

					<div>
						<Typography className="mb-1" variant="h4">
							{t('yourRights.title')}
						</Typography>
						<Typography>{t('yourRights.body')}</Typography>
					</div>

					<div>
						<Typography className="mb-1" variant="h4">
							{t('security.title')}
						</Typography>
						<Typography>{t('security.body')}</Typography>
					</div>

					<div>
						<Typography className="mb-1" variant="h4">
							{t('changes.title')}
						</Typography>
						<Typography>{t('changes.body')}</Typography>
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

export default PrivacyPolicy;
