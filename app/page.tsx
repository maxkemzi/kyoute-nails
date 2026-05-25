import {DoubleLeafIcon, FlowerIcon, LeafIcon} from '@/components/icons';
import {Logo, Section, Typography} from '@/components/ui';
import Image from 'next/image';
import {Instagram} from 'react-feather';
import NailsImage from './NailsImage';

const Home = () => {
	return (
		<div>
			<div className="pt-12">
				<div className="container container-lg">
					<div className="relative bg-secondary rounded-full flex">
						<div className="relative flex items-center gap-7 px-12">
							<div className="w-4 h-4 bg-background rounded-full" />
							<div className="w-4 h-4 bg-background rounded-full" />

							<LeafIcon
								className="absolute top-0.5 -translate-y-full -rotate-12 right-0 -z-1"
								size={28}
							/>

							<DoubleLeafIcon
								className="absolute top-full -translate-1/2 -rotate-12 left-0 -z-1"
								size={53}
							/>
						</div>
						<div className="container container-sm">
							<div className="flex items-center justify-between">
								<Logo className="pt-3 pb-2" />
								<a
									href="https://www.instagram.com/kyoute_nailsriga"
									target="_blank"
									rel="noreferrer noopenner"
								>
									<Instagram className="text-primary" size={36} />
								</a>
							</div>
						</div>
						<div className="relative flex items-center px-12">
							<div className="w-4 h-4 bg-background rounded-full" />

							<LeafIcon
								className="absolute top-0.5 -translate-y-full rotate-12 -scale-x-100 left-0 -z-1"
								size={28}
							/>

							<DoubleLeafIcon
								className="absolute top-full -translate-y-1/2 translate-x-1/2 rotate-12 -scale-x-100 right-0 -z-1"
								size={53}
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
						<NailsImage src="/nails-1.jpg" />
						<NailsImage src="/nails-2.jpg" />
						<NailsImage src="/nails-3.jpg" />

						<FlowerIcon
							className="absolute top-1.5 left-0 -translate-1/2 -z-1"
							size={100}
						/>

						<FlowerIcon
							className="absolute bottom-1.5 right-0 translate-1/2 -z-1"
							size={70}
						/>
					</div>
				</div>
			</Section>
		</div>
	);
};

export default Home;
