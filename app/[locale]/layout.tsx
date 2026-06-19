import {CartSidebar, Footer, Header} from '@/components/layout';
import {routing} from '@/app/i18n/routing';
import {CartProvider} from '@/lib/cart';
import {LightboxProvider} from '@/lib/lightbox';
import type {Metadata} from 'next';
import {hasLocale, NextIntlClientProvider} from 'next-intl';
import {Inter} from 'next/font/google';
import {notFound} from 'next/navigation';
import {Toaster} from 'sonner';
import {getTranslations} from 'next-intl/server';

const inter = Inter({
	subsets: ['latin', 'cyrillic'],
	variable: '--font-inter',
});

export const generateMetadata = async ({
	params,
}: {
	params: Promise<{locale: string}>;
}): Promise<Metadata> => {
	const {locale} = await params;
	const t = await getTranslations({locale, namespace: 'common'});

	return {
		title: {
			default: 'Kyoute Nails',
			template: '%s | Kyoute Nails',
		},
		description: t('meta.description'),
		metadataBase: new URL('https://kyoutenails.com'),
		icons: {
			icon: [
				{url: '/favicon.ico', sizes: '16x16', type: 'image/x-icon'},
				{url: '/icon-32.png', sizes: '32x32', type: 'image/png'},
				{url: '/icon-192.png', sizes: '192x192', type: 'image/png'},
				{url: '/icon-512.png', sizes: '512x512', type: 'image/png'},
			],
			apple: [{url: '/apple-icon.png', sizes: '180x180', type: 'image/png'}],
		},
	};
};

export default async function LocaleLayout({
	children,
	params,
}: Readonly<{children: React.ReactNode; params: Promise<{locale: string}>}>) {
	const {locale} = await params;
	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	return (
		<html
			className={`${inter.variable} h-full antialiased scroll-smooth`}
			lang={locale}
			data-scroll-behaviour="smooth"
		>
			<head>
				<link rel="preconnect" href="https://cdn.shopify.com" />
			</head>
			<body className="flex flex-col bg-background text-background-foreground min-h-full">
				<NextIntlClientProvider>
					<LightboxProvider>
						<CartProvider>
							<Header />
							<main className="flex-1 flex flex-col overflow-x-hidden">
								{children}
							</main>
							<CartSidebar />
							<Footer />
							<Toaster position="top-right" />
						</CartProvider>
					</LightboxProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
