import {Logo} from '../ui';
import NavLink from './NavLink';

const Footer = () => {
	return (
		<footer className="shadow-[0_-1px_3px_0_rgb(0,0,0,0.1),0_-1px_2px_-1px_rgb(0,0,0,0.1)] py-12">
			<div className="container container-lg">
				<Logo className="mb-6" color="backgroundForeground" />
				<nav>
					<ul className="flex flex-col gap-3.5">
						<li>
							<NavLink href="/">Contact</NavLink>
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
