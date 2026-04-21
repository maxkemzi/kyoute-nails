import {Section, Typography} from '@/components/ui';
import Image from 'next/image';

const AboutMe = () => {
	return (
		<Section>
			<div className="container container-sm">
				<div className="flex items-center gap-7 mb-9 max-md:flex-col max-md:items-start">
					<Image
						className="shrink-0 h-auto object-contain rounded-3xl max-md:self-center"
						width={300}
						height={309}
						src="/portrait.jpg"
						alt="portrait"
					/>
					<div>
						<Typography className="mb-4" variant="h2">
							About me
						</Typography>
						<Typography className="mb-2">
							I am originally from Ukraine and have been interested in
							the beauty service industry since childhood. I hold five
							professional certifications: – two in manicure – two in
							pedicure – one in nail extensions. Over the years, I have
							gained practical experience and continuously improved my
							technical skills.
						</Typography>
						<Typography>
							Kyoute Nails was created to provide accessible,
							high-quality press-on nail designs for those who want
							beautiful results quickly and conveniently. My goal is to
							combine professional standards with modern design, so every
							client receives a product that looks polished, neat, and
							uplifting.
						</Typography>
					</div>
				</div>

				<div>
					<Typography className="mb-6" variant="h3" weight="bold">
						Certificates
					</Typography>
					<div className="grid grid-cols-6 gap-4 max-md:grid-cols-2 max-xs:grid-cols-1">
						<div className="col-span-3 bg-background-foreground/75 h-62.5 rounded-3xl max-md:col-span-1" />
						<div className="col-span-3 bg-background-foreground/75 h-62.5 rounded-3xl max-md:col-span-1" />
						<div className="col-span-2 bg-background-foreground/75 h-62.5 rounded-3xl max-md:col-span-1" />
						<div className="col-span-2 bg-background-foreground/75 h-62.5 rounded-3xl max-md:col-span-1" />
						<div className="col-span-2 bg-background-foreground/75 h-62.5 rounded-3xl max-md:col-span-1" />
					</div>
				</div>
			</div>
		</Section>
	);
};

export default AboutMe;
