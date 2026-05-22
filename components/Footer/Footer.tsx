import {Logo} from '../ui';
import NavLink from './NavLink';

const Footer = () => {
	return (
		<footer className="shadow-border py-12">
			<div className="container container-lg">
				<Logo className="mb-6" color="backgroundForeground" />
				<nav>
					<ul className="flex flex-col gap-3.5">
						<li>
							<NavLink href="/contact">Contact</NavLink>
						</li>
						<li>
							<NavLink href="/">Shipping</NavLink>
						</li>
						<li>
							<NavLink href="/">Refund</NavLink>
						</li>
						<li>
							<NavLink href="/">Terms and conditions</NavLink>
						</li>
						<li>
							<NavLink href="/">Privacy policy</NavLink>
						</li>
					</ul>
				</nav>
			</div>
		</footer>
	);
};

export default Footer;
