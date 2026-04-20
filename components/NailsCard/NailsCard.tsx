import Image from 'next/image';
import {Button, Typography} from '../ui';
import Link from 'next/link';

const NailsCard = () => {
	return (
		<Link className="group" href="/">
			<div className="flex flex-col h-125 shadow-sm rounded-3xl overflow-hidden">
				<div className="relative grow">
					<Image src="/nails-1.jpg" fill objectFit="cover" alt="nails" />
					<div className="absolute inset-0 bg-background-foreground/35 flex items-center justify-center transition-opacity opacity-0 group-hover:opacity-100">
						<Button>Add to cart</Button>
					</div>
				</div>
				<div className="shrink-0 text-center bg-background py-3 px-4">
					<Typography className="mb-2" weight="medium" variant="h4">
						Koyuki
					</Typography>
					<Typography weight="semibold">€30.00</Typography>
				</div>
			</div>
		</Link>
	);
};

export default NailsCard;
