'use client';

import {Typography} from '@/components/ui';
import {useTranslations} from 'next-intl';

const BookLink = () => {
	const t = useTranslations('Header.navbar');

	return (
		<a
			className="inline-block relative text-primary p-4 hover:text-primary-foreground hover:after:w-full hover:after:opacity-100 after:content-[''] after:absolute after:transition-all after:top-0 after:left-1/2 after:-translate-x-1/2 after:-z-1 after:w-0 after:h-full after:bg-primary after:opacity-0 max-md:py-1.5 max-md:px-0"
			href="https://www.fresha.com/a/kyuote-nails-riga-vidzeme-suburb-riga-riga-zagatu-iela-22-va13s7md/booking"
			target="_blank"
			rel="noreferrer noopenner"
		>
			<Typography
				className="transition-colors"
				weight="semibold"
				color="inherit"
				textTransform="uppercase"
				as="span"
			>
				{t('links.book')}
			</Typography>
		</a>
	);
};

export default BookLink;
