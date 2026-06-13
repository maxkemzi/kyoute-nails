import {LogoLink} from '@/components';
import {DoubleLeafIcon} from '@/components/icons';
import {ResponsiveIcon, Section, Typography} from '@/components/ui';
import {getProducts, sortMap} from '@/lib/shopify';
import {LeafIcon} from '@phosphor-icons/react/dist/ssr';
import {getTranslations} from 'next-intl/server';
import {Instagram} from 'react-feather';
import FeaturedProducts from './FeaturedProducts';

const Home = async ({params}: {params: Promise<{locale: string}>}) => {
	const {locale} = await params;
	const t = await getTranslations('Home');
	const {sortKey, reverse} = sortMap.featured;
	const {products} = await getProducts({first: 3, sortKey, reverse, locale});

	return (
		<div>
			<div className="pt-12">
				<div className="container container-lg">
					<div className="relative bg-secondary rounded-full flex">
						<div className="relative flex items-center gap-7 px-12 max-md:px-4 max-xs:px-2">
							<div className="w-4 h-4 bg-background rounded-full max-md:hidden" />
							<div className="w-4 h-4 bg-background rounded-full max-md:hidden" />

							<ResponsiveIcon
								className="absolute top-0.5 right-0 -translate-y-full -rotate-12 text-leaf -z-1 max-md:-right-14"
								icon={LeafIcon}
								weight="fill"
								size={28}
								mdSize={24}
								xsSize={20}
							/>

							<ResponsiveIcon
								className="absolute -bottom-1 left-2.5 translate-y-1/2 -translate-x-1/2 -z-1"
								icon={DoubleLeafIcon}
								size={40}
								mdSize={36}
								xsSize={32}
							/>
						</div>
						<div className="container container-sm max-md:px-2">
							<div className="flex items-center justify-between">
								<LogoLink className="pt-3 pb-2" />
								<a
									href="https://www.instagram.com/kyoute_nailsriga"
									target="_blank"
									rel="noreferrer noopenner"
									aria-label={t('hero.openInstagramPage')}
								>
									<ResponsiveIcon
										className="text-primary"
										icon={Instagram}
										size={36}
										mdSize={32}
										xsSize={24}
									/>
								</a>
							</div>
						</div>
						<div className="relative flex items-center px-12 max-md:px-4 max-xs:px-2">
							<div className="w-4 h-4 bg-background rounded-full max-md:hidden" />

							<ResponsiveIcon
								className="absolute top-0.5 left-0 -translate-y-full rotate-12 -scale-x-100 text-leaf -z-1 max-md:-left-14"
								icon={LeafIcon}
								weight="fill"
								size={28}
								mdSize={24}
								xsSize={20}
							/>

							<ResponsiveIcon
								className="absolute -bottom-1 right-2.5 translate-y-1/2 translate-x-1/2 -scale-x-100 -z-1"
								icon={DoubleLeafIcon}
								size={40}
								mdSize={36}
								xsSize={32}
							/>
						</div>
					</div>
				</div>
			</div>
			<Section>
				<div className="container container-md">
					<div className="mb-20 text-center max-lg:mb-16 max-md:mb-12">
						<Typography
							className="mb-2"
							variant="h3"
							weight="normal"
							textTransform="uppercase"
							italic
							letterSpacing="wide"
						>
							{t('hero.subtitle')}
						</Typography>
						<Typography variant="h1">
							{t('hero.titleStart')}{' '}
							<span className="lowercase">
								{t('hero.titleConjunction')}
							</span>{' '}
							{t('hero.titleEnd')}
						</Typography>
					</div>

					<FeaturedProducts products={products} />
				</div>
			</Section>
		</div>
	);
};

export default Home;
