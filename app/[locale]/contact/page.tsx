import {Section, Typography} from '@/components/ui';
import ContactForm from './ContactForm';
import {getTranslations} from 'next-intl/server';
import {Metadata} from 'next';

export const generateMetadata = async ({
	params,
}: {
	params: Promise<{locale: string}>;
}): Promise<Metadata> => {
	const {locale} = await params;
	const t = await getTranslations({locale, namespace: 'Contact'});

	return {
		title: t('meta.title'),
		description: t('meta.description'),
	};
};

const Contact = async () => {
	const t = await getTranslations('Contact');

	return (
		<Section>
			<div className="container container-xs">
				<div className="max-w-143.75 w-full mx-auto">
					<Typography className="mb-4 text-center" variant="h2">
						{t('title')}
					</Typography>
					<Typography
						className="mb-9 text-center"
						size="2xl"
						weight="medium"
					>
						{t('subtitleStart')}{' '}
						<a
							className="pb-0.5 border-b italic text-nowrap capitalize"
							href="https://www.instagram.com/kyoute_nailsriga"
							target="_blank"
							rel="noreferrer noopenner"
						>
							{t('subtitleInstagram')}
						</a>
						.
					</Typography>
					<ContactForm />
				</div>
			</div>
		</Section>
	);
};

export default Contact;
