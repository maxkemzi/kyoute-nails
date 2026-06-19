import type {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
	output: 'standalone',
	images: {
		remotePatterns: [
			{protocol: 'https', hostname: 'cdn.shopify.com'},
			{protocol: 'https', hostname: 'judgeme.imgix.net'},
		],
	},
	allowedDevOrigins: ['10.116.75.190'],
};

const withNextIntl = createNextIntlPlugin('./app/i18n/request.ts');
export default withNextIntl(nextConfig);
