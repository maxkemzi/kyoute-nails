import {Section, Typography} from '@/components/ui';
import {getTranslations} from 'next-intl/server';

const NotFound = async () => {
	const t = await getTranslations('NotFound');
	return (
		<Section className="flex-1 flex items-center justify-center">
			<Typography variant="h2">404 – {t('pageNotFound')}</Typography>
		</Section>
	);
};

export default NotFound;
