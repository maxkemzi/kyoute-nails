import {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';
import {notFound} from 'next/navigation';

export const generateMetadata = async ({
	params,
}: {
	params: Promise<{locale: string}>;
}): Promise<Metadata> => {
	const {locale} = await params;
	const t = await getTranslations({locale, namespace: 'NotFound'});

	return {
		title: t('pageNotFound'),
	};
};

const CatchAllPage = () => {
	notFound();
};

export default CatchAllPage;
