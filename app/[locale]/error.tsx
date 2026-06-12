'use client';

import {Button, Typography} from '@/components/ui';
import {useTranslations} from 'next-intl';

const Error = ({
	error,
	reset,
}: {
	error: Error & {digest?: string};
	reset: () => void;
}) => {
	const t = useTranslations('Error');

	return (
		<div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
			<Typography variant="h3">{t('somethingWentWrong')}</Typography>
			<Typography color="danger">{error.message}</Typography>
			<Button onClick={reset}>{t('tryAgain')}</Button>
		</div>
	);
};

export default Error;
