import {Logo, ResponsiveIcon, Section, Typography} from '@/components/ui';
import {Instagram} from 'react-feather';
import {LeafIcon, FlowerIcon} from '@phosphor-icons/react/dist/ssr';
import {sortMap} from '@/lib/shopify/sort';
import {getProducts} from '@/lib/shopify/products';
import Link from 'next/link';
import Image from 'next/image';
import {DoubleLeafIcon} from '@/components/icons';

const Home = async () => {
	const {sortKey, reverse} = sortMap.featured;
	const {products} = await getProducts(3, null, sortKey, reverse);

	return (
		<div>
			<div className="pt-12">
				<div className="container container-lg">
					<div className="relative bg-secondary rounded-full flex">
						<div className="relative flex items-center gap-7 px-12 max-md:px-4 max-xs:px-2">
							<div className="w-4 h-4 bg-background rounded-full max-md:hidden" />
							<div className="w-4 h-4 bg-background rounded-full max-md:hidden" />

							<ResponsiveIcon
								className="absolute top-0.5 -translate-y-full -rotate-12 right-0 text-leaf -z-1 max-md:-right-14"
								icon={LeafIcon}
								weight="fill"
								size={28}
								mdSize={24}
								xsSize={20}
							/>

							<ResponsiveIcon
								className="absolute top-[calc(100%+5.5px)] -left-2 -translate-y-1/2 -z-1"
								icon={DoubleLeafIcon}
								size={40}
								mdSize={36}
								xsSize={32}
							/>
						</div>
						<div className="container container-sm max-md:px-2">
							<div className="flex items-center justify-between">
								<Link className="pt-3 pb-2" href="/">
									<ResponsiveIcon
										icon={Logo}
										size={286}
										mdSize={200}
										xsSize={150}
									/>
								</Link>
								<a
									href="https://www.instagram.com/kyoute_nailsriga"
									target="_blank"
									rel="noreferrer noopenner"
								>
									<ResponsiveIcon
										className="text-primary"
										icon={Instagram}
										size={36}
										mdSize={32}
										smSize={28}
									/>
								</a>
							</div>
						</div>
						<div className="relative flex items-center px-12 max-md:px-4 max-xs:px-2">
							<div className="w-4 h-4 bg-background rounded-full max-md:hidden" />

							<ResponsiveIcon
								className="absolute top-0.5 -translate-y-full rotate-12 -scale-x-100 left-0 text-leaf -z-1 max-md:-left-14"
								icon={LeafIcon}
								weight="fill"
								size={28}
								mdSize={24}
								xsSize={20}
							/>

							<ResponsiveIcon
								className="absolute top-[calc(100%+5.5px)] -right-2 -translate-y-1/2 -scale-x-100 -z-1"
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
					<div className="mb-20 text-center">
						<Typography
							className="mb-2"
							variant="h3"
							weight="normal"
							textTransform="uppercase"
							italic
							letterSpacing="wide"
						>
							Happiness grows where
						</Typography>
						<Typography variant="h1">
							Nails Shine{' '}
							<Typography
								as="span"
								variant="h3"
								weight="normal"
								italic
								letterSpacing="wide"
							>
								&
							</Typography>{' '}
							Flowers Bloom
						</Typography>
					</div>

					<div className="relative flex items-center gap-7">
						{products.map(p => {
							const {id, handle, title} = p;
							const image = p.images.edges[0].node;
							return (
								<Link
									key={id}
									className="relative flex-1/3 h-125 rounded-3xl overflow-hidden"
									href={`/buy-press-on-nails/${handle}`}
								>
									<Image
										className="object-cover"
										fill
										src={image.url}
										alt={image.altText || title}
									/>
								</Link>
							);
						})}

						<FlowerIcon
							className="absolute top-1.5 left-0 -translate-1/2 -z-1 text-secondary"
							weight="fill"
							size={100}
						/>

						<FlowerIcon
							className="absolute bottom-1.5 right-0 translate-1/2 -z-1 text-secondary"
							weight="fill"
							size={70}
						/>
					</div>
				</div>
			</Section>
		</div>
	);
};

export default Home;
