import Image from 'next/image';
import {Button, Typography} from '../ui';
import Link from 'next/link';

interface Props {
	image: {url: string; alt?: string};
	title: string;
	price: string;
}

const NailsCard = ({image, title, price}: Props) => {
	return (
		<div className="relative group flex flex-col h-125 shadow-sm rounded-3xl overflow-hidden">
			<div className="relative grow">
				<Image
					src={image.url}
					fill
					objectFit="cover"
					alt={image.alt || title}
				/>
				<div className="absolute inset-0 bg-background-foreground/35 flex items-center justify-center transition-opacity opacity-0 group-hover:opacity-100">
					<Button className="z-10" variant="outline">
						Add to cart
					</Button>
				</div>
			</div>
			<div className="shrink-0 text-center bg-background py-3 px-4">
				<Typography className="mb-1" weight="medium" variant="h4">
					{title}
				</Typography>
				<Typography weight="semibold">{price}</Typography>
			</div>

			<Link
				className="absolute inset-0"
				href="/buy-press-on-nails/nails-1"
			/>
		</div>
	);
};

export default NailsCard;
