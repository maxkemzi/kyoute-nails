import {LogoLink} from '@/components';
import {getTranslations} from 'next-intl/server';
import NavLink from './NavLink';

const Footer = async () => {
	const t = await getTranslations('Footer');

	return (
		<footer className="shadow-border py-12">
			<div className="container container-lg">
				<LogoLink
					className="inline-block mb-6"
					logoColor="backgroundForeground"
				/>
				<nav>
					<ul className="flex flex-col gap-3.5">
						<li>
							<NavLink href="/contact">{t('navbar.contact')}</NavLink>
						</li>
						<li>
							<NavLink href="/shipping">{t('navbar.shipping')}</NavLink>
						</li>
						<li>
							<NavLink href="/refund">{t('navbar.refund')}</NavLink>
						</li>
						<li>
							<NavLink href="/terms-and-conditions">
								{t('navbar.termsAndConditions')}
							</NavLink>
						</li>
						<li>
							<NavLink href="/">{t('navbar.privacyPolicy')}</NavLink>
						</li>
					</ul>
				</nav>
			</div>
		</footer>
	);
};

export default Footer;
