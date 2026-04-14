import {Typography} from '@/components/ui';
import Image from 'next/image';
import Link from 'next/link';
import {Instagram} from 'react-feather';

const Home = () => {
	return (
		<div className="pt-12">
			<div className="container container-lg">
				<div className="relative bg-secondary rounded-full flex">
					<div className="relative flex items-center gap-7 px-12">
						<div className="w-4 h-4 bg-background rounded-full" />
						<div className="w-4 h-4 bg-background rounded-full" />

						<Image
							className="absolute top-0.5 -translate-y-full -rotate-12 right-0 -z-1"
							width={28}
							height={28}
							src="./leaf.svg"
							alt="leaf"
						/>

						<Image
							className="absolute top-full -translate-1/2 -rotate-12 left-0 -z-1"
							width={53}
							height={48}
							src="./double-leaf.svg"
							alt="leaf"
						/>
					</div>
					<div className="container container-sm">
						<div className="flex items-center justify-between">
							<Image
								className="pt-3 pb-2"
								width={286}
								height={56}
								src="./logo.svg"
								alt="logo"
							/>
							<Link href="https://www.instagram.com/kyoute_nailsriga">
								<Instagram className="text-primary" size={36} />
							</Link>
						</div>
					</div>
					<div className="relative flex items-center px-12">
						<div className="w-4 h-4 bg-background rounded-full" />

						<Image
							className="absolute top-0.5 -translate-y-full rotate-12 -scale-x-100 left-0 -z-1"
							width={28}
							height={28}
							src="./leaf.svg"
							alt="leaf"
						/>

						<Image
							className="absolute top-full -translate-y-1/2 translate-x-1/2 rotate-12 -scale-x-100 right-0 -z-1"
							width={53}
							height={48}
							src="./double-leaf.svg"
							alt="leaf"
						/>
					</div>
				</div>
			</div>
			<div className="py-16">
				<div className="container container-md">
					<div className="text-center">
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

					<div className="pt-20">
						<div className="relative flex items-center gap-7">
							<div className="relative flex-1/3 h-[500px] rounded-3xl overflow-hidden">
								<Image
									fill
									src="/nails-1.jpg"
									objectFit="cover"
									alt="nails"
								/>
							</div>
							<div className="relative flex-1/3 h-[500px] rounded-3xl overflow-hidden">
								<Image
									fill
									src="/nails-2.jpg"
									objectFit="cover"
									alt="nails"
								/>
							</div>
							<div className="relative flex-1/3 h-[500px] rounded-3xl overflow-hidden">
								<Image
									fill
									src="/nails-3.jpg"
									objectFit="cover"
									alt="nails"
								/>
							</div>

							<Image
								className="absolute top-1.5 left-0 -translate-1/2 -z-1"
								width={100}
								height={100}
								src="/flower.svg"
								alt="flower"
							/>

							<Image
								className="absolute bottom-1.5 right-0 translate-1/2 -z-1"
								width={70}
								height={70}
								src="/flower.svg"
								alt="flower"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
