'use client';

import {useState, useEffect} from 'react';
import LangDropdown from './LangDropdown';
import Navbar from './Navbar';
import ShoppingBag from './ShoppingBag';
import {twMerge} from 'tailwind-merge';

const Header = () => {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => setIsScrolled(window.scrollY > 0);
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<header
			className={twMerge(
				'sticky top-0 z-30 shadow-border bg-background transition-shadow max-md:py-4',
				isScrolled && 'shadow-md shadow-background-foreground/10',
			)}
		>
			<div className="container container-lg">
				<div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 max-lg:grid-cols-[1fr_auto]">
					<div className="max-lg:hidden" />
					<Navbar />
					<div className="justify-self-end flex items-center gap-4 max-md:gap-3">
						<LangDropdown />
						<ShoppingBag />
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
