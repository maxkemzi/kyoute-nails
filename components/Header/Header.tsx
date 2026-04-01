import {getT} from 'next-i18next/server';
import LangDropdown from './LangDropdown';
import NavLink from './NavLink';
import ShoppingBag from './ShoppingBag';

const Header = async () => {
	const {t} = await getT('header');

	return (
		<header className="shadow-sm">
			<div className="container container-lg">
				<div className="grid grid-cols-[1fr_auto_1fr] items-center">
					<div />
					<nav>
						<ul className="flex items-center gap-5">
							<li>
								<NavLink href="/">{t('navbar.home')}</NavLink>
							</li>
							<li>
								<NavLink href="/buy-press-on-nails">
									{t('navbar.buy-press-on-nails')}
								</NavLink>
							</li>
							<li>
								<NavLink href="/custom-press-on-nails">
									{t('navbar.custom-press-ons')}
								</NavLink>
							</li>
							<li>
								<NavLink href="/guides">{t('navbar.guides')}</NavLink>
							</li>
							<li>
								<NavLink href="/about-me">
									{t('navbar.about-me')}
								</NavLink>
							</li>
						</ul>
					</nav>
					<div className="justify-self-end flex items-center gap-4">
						<LangDropdown />
						<ShoppingBag />
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
