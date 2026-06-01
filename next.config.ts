import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{protocol: 'https', hostname: 'cdn.shopify.com'},
			{protocol: 'https', hostname: 'judgeme.imgix.net'},
		],
	},
};

export default nextConfig;
