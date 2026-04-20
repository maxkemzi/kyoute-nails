import {Button, Section, Typography} from '@/components/ui';
import Image from 'next/image';

const PressOnNailsDetails = () => {
	return (
		<Section>
			<div className="container container-md">
				<div className="flex gap-16 max-lg:gap-9 max-md:flex-col max-md:gap-7">
					<div className="flex-1 rounded-3xl overflow-hidden">
						<Image
							className="w-full h-auto object-contain"
							width={600}
							height={756}
							src="/nails-1.jpg"
							alt="nails"
						/>
					</div>

					<div className="flex-1">
						<Typography className="mb-2" variant="h3">
							Koyuki
						</Typography>
						<Typography className="mb-7" variant="h4">
							€30.00
						</Typography>
						<Typography className="mb-9">
							These extra-long stiletto nails feature a stunning ombre
							gradient that flows from vibrant hot pink at the base to
							crisp white at the tips, creating a soft, dreamy transition
							with a subtle metallic sheen on some fingers.
						</Typography>

						<Button>Add to cart</Button>
					</div>
				</div>
			</div>
		</Section>
	);
};

export default PressOnNailsDetails;
