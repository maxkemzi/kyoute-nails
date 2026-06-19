import {Section, Typography} from '@/components/ui';
import {getTranslations} from 'next-intl/server';
import {Metadata} from 'next';

export const generateMetadata = async ({
	params,
}: {
	params: Promise<{locale: string}>;
}): Promise<Metadata> => {
	const {locale} = await params;
	const t = await getTranslations({locale, namespace: 'Shipping'});

	return {title: t('meta.title'), description: t('meta.description')};
};

const Shipping = async () => {
	const t = await getTranslations('Shipping');

	return (
		<Section>
			<div className="container container-xs">
				<Typography className="mb-9 text-center" variant="h2">
					{t('title')}
				</Typography>

				<div className="flex flex-col gap-7">
					<div>
						<Typography className="mb-1" variant="h4">
							{t('areas.title')}
						</Typography>
						<Typography>{t('areas.body')}</Typography>
					</div>

					<div>
						<Typography className="mb-1" variant="h4">
							{t('processingTime.title')}
						</Typography>
						<Typography>{t('processingTime.body')}</Typography>
					</div>

					<div>
						<Typography className="mb-1" variant="h4">
							{t('deliveryTime.title')}
						</Typography>
						<Typography>{t('deliveryTime.body')}</Typography>
					</div>

					<div>
						<Typography className="mb-1" variant="h4">
							{t('cost.title')}
						</Typography>
						<Typography>{t('cost.body')}</Typography>
					</div>

					<div>
						<Typography className="mb-1" variant="h4">
							{t('tracking.title')}
						</Typography>
						<Typography>{t('tracking.body')}</Typography>
					</div>

					<div>
						<Typography className="mb-1" variant="h4">
							{t('issues.title')}
						</Typography>
						<Typography>{t('issues.body')}</Typography>
					</div>
				</div>
			</div>
		</Section>
	);
};

export default Shipping;
