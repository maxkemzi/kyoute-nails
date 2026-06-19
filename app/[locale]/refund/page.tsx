import {Section, Typography} from '@/components/ui';
import {getTranslations} from 'next-intl/server';
import {Metadata} from 'next';

export const generateMetadata = async ({
	params,
}: {
	params: Promise<{locale: string}>;
}): Promise<Metadata> => {
	const {locale} = await params;
	const t = await getTranslations({locale, namespace: 'Refund'});

	return {title: t('meta.title'), description: t('meta.description')};
};

const Refund = async () => {
	const t = await getTranslations('Refund');

	return (
		<Section>
			<div className="container container-xs">
				<Typography className="mb-9 text-center" variant="h2">
					{t('title')}
				</Typography>

				<div className="flex flex-col gap-7">
					<div>
						<Typography className="mb-1" variant="h4">
							{t('returnWindow.title')}
						</Typography>
						<Typography>{t('returnWindow.body')}</Typography>
					</div>

					<div>
						<Typography className="mb-1" variant="h4">
							{t('eligibility.title')}
						</Typography>
						<Typography>{t('eligibility.body')}</Typography>
					</div>

					<div>
						<Typography className="mb-1" variant="h4">
							{t('customOrders.title')}
						</Typography>
						<Typography>{t('customOrders.body')}</Typography>
					</div>

					<div>
						<Typography className="mb-1" variant="h4">
							{t('howToReturn.title')}
						</Typography>
						<Typography>{t('howToReturn.body')}</Typography>
					</div>

					<div>
						<Typography className="mb-1" variant="h4">
							{t('refundProcess.title')}
						</Typography>
						<Typography>{t('refundProcess.body')}</Typography>
					</div>

					<div>
						<Typography className="mb-1" variant="h4">
							{t('damagedItems.title')}
						</Typography>
						<Typography>{t('damagedItems.body')}</Typography>
					</div>
				</div>
			</div>
		</Section>
	);
};

export default Refund;
