import {Logo, ResponsiveIcon} from '../ui';
import NavLink from './NavLink';
import Link from 'next/link';

const Footer = () => {
	return (
		<footer className="shadow-border py-12">
			<div className="container container-lg">
				<Link href="/">
					<ResponsiveIcon
						className="mb-6"
						color="backgroundForeground"
						icon={Logo}
						size={286}
						mdSize={200}
					/>
				</Link>
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
