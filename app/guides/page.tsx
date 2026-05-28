import {Accordion, Section, Typography} from '@/components/ui';

const Guides = () => {
	return (
		<Section>
			<div className="container container-xs">
				<Typography className="text-center mb-9" variant="h2">
					Guides
				</Typography>

				<div>
					<Accordion title="How to measure your nails">
						<Typography className="mb-6">
							Follow one of the two methods below
						</Typography>
						<ul className="flex flex-col gap-4">
							<li>
								<div className="flex gap-2 mb-4">
									<Typography
										as="span"
										textTransform="uppercase"
										italic
										letterSpacing="wide"
									>
										Method 1:
									</Typography>
									<Typography
										weight="medium"
										textTransform="uppercase"
									>
										Flexible Measuring Tape
									</Typography>
								</div>

								<ol className="flex flex-col gap-2 list-decimal list-inside">
									<li>
										At the widest part of your nail bed, place the
										flexible measuring tape from one edge to the
										other, following the natural curve of your nail.
									</li>
									<li>
										Record your measurement and repeat for each nail.
									</li>
								</ol>
							</li>

							<li>
								<div className="flex gap-2 mb-4">
									<Typography
										as="span"
										textTransform="uppercase"
										italic
										letterSpacing="wide"
									>
										Method 2:
									</Typography>
									<Typography
										weight="medium"
										textTransform="uppercase"
									>
										Sticky Tape
									</Typography>
								</div>

								<ol className="flex flex-col gap-2 list-decimal list-inside">
									<li>
										Paste sticky tape over the widest part of your
										nail bed, following its natural curve.
									</li>
									<li>
										Use a pen to mark both edges of the tape at the
										widest point of your nail bed.
									</li>
									<li>
										Remove the tape and use a ruler to measure the
										marked distance.
									</li>
									<li>
										Record your measurement and repeat for each nail.
									</li>
								</ol>
							</li>
						</ul>
					</Accordion>
				</div>
			</div>
		</Section>
	);
};

export default Guides;
