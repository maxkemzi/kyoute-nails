import {NailsCard} from '@/components';
import {Typography} from '@/components/ui';
import SortDropdown from './SortDropdown';
import Image from 'next/image';

const BuyPressOnNails = async () => {
	return (
		<section className="py-20">
			<div className="container container-md">
				<Typography
					className="text-center mb-9"
					variant="h2"
					textTransform="capitalize"
				>
					Buy Press-On Nails
				</Typography>
				<div className="flex justify-end mb-7">
					<SortDropdown />
				</div>
				<div className="relative grid grid-cols-3 gap-7 max-lg:grid-cols-2 max-sm:grid-cols-1">
					<NailsCard />
					<NailsCard />
					<NailsCard />

					<Image
						className="absolute top-1.5 left-0 -translate-1/2 rotate-90 -z-1"
						width={100}
						height={100}
						src="/flower.svg"
						alt="flower"
					/>

					<Image
						className="absolute bottom-1.5 right-0 translate-1/2 rotate-12 -z-1"
						width={70}
						height={70}
						src="/flower.svg"
						alt="flower"
					/>
				</div>
			</div>
		</section>
	);
};

export default BuyPressOnNails;
