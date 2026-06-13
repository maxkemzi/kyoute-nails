import {Accordion, Section, Typography} from '@/components/ui';
import {getTranslations} from 'next-intl/server';

const Guides = async () => {
	const t = await getTranslations('Guides');

	return (
		<Section>
			<div className="container container-xs">
				<Typography className="text-center mb-9" variant="h2">
					{t('title')}
				</Typography>

				<div>
					<Accordion title={t('content.howToMeasure.title')}>
						<ul className="flex flex-col gap-4">
							<li>
								<div className="flex gap-2 flex-wrap mb-4">
									<Typography
										as="span"
										textTransform="uppercase"
										italic
										letterSpacing="wide"
									>
										{t('content.method')} 1:
									</Typography>
									<Typography
										weight="medium"
										textTransform="uppercase"
									>
										{t('content.howToMeasure.flexibleTape.title')}
									</Typography>
								</div>

								<ol className="flex flex-col gap-2 flex-wrap list-decimal list-inside">
									<Typography as="li">
										{t('content.howToMeasure.flexibleTape.step1')}
									</Typography>
									<Typography as="li">
										{t('content.howToMeasure.flexibleTape.step2')}
									</Typography>
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
										{t('content.method')} 2:
									</Typography>
									<Typography
										weight="medium"
										textTransform="uppercase"
									>
										{t('content.howToMeasure.stickyTape.title')}
									</Typography>
								</div>

								<ol className="flex flex-col gap-2 list-decimal list-inside">
									<Typography as="li">
										{t('content.howToMeasure.stickyTape.step1')}
									</Typography>
									<Typography as="li">
										{t('content.howToMeasure.stickyTape.step2')}
									</Typography>
									<Typography as="li">
										{t('content.howToMeasure.stickyTape.step3')}
									</Typography>
									<Typography as="li">
										{t('content.howToMeasure.stickyTape.step4')}
									</Typography>
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
