'use client';

import {useEffect, useState} from 'react';
import {Menu, X} from 'react-feather';
import {twJoin, twMerge} from 'tailwind-merge';
import NavLink from './NavLink';
import {useTranslations} from 'next-intl';
import {Button} from '@/components/ui';

const Navbar = () => {
	const t = useTranslations('Header.navbar');
	const [isOpen, setIsOpen] = useState(false);

	const open = () => setIsOpen(true);
	const close = () => setIsOpen(false);

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') close();
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, []);

	useEffect(() => {
		document.body.style.overflow = isOpen ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	}, [isOpen]);

	return (
		<nav>
			<button
				className="hidden max-md:block cursor-pointer"
				onClick={open}
				aria-label={t('openMenu')}
			>
				<Menu className="text-background-foreground" size={24} />
			</button>
			<div
				className={twJoin(
					'hidden max-md:block fixed inset-0 max-md:bg-black/25 z-40 transition-[opacity,visibility]',
					isOpen ? 'opacity-100 visible' : 'opacity-0 invisible',
				)}
				onClick={close}
			/>
			<ul
				className={twMerge(
					'flex items-center gap-7 max-md:fixed max-md:top-0 max-md:bottom-0 max-md:left-0 max-md:z-50 max-md:flex-col max-md:items-start max-md:bg-background max-md:p-4 max-md:shadow-border max-md:gap-3 max-md:transition-transform',
					isOpen ? 'max-md:translate-x-0' : 'max-md:-translate-x-full',
				)}
			>
				<li className="hidden max-md:list-item">
					<button
						className="cursor-pointer"
						onClick={close}
						aria-label={t('closeMenu')}
					>
						<X size={24} />
					</button>
				</li>
				<li>
					<NavLink onClick={close} href="/">
						{t('links.home')}
					</NavLink>
				</li>
				<li>
					<NavLink onClick={close} href="/buy-press-on-nails">
						{t('links.buyPressOnNails')}
					</NavLink>
				</li>
				<li>
					<NavLink onClick={close} href="/guides">
						{t('links.guides')}
					</NavLink>
				</li>
				<li>
					<NavLink onClick={close} href="/about-me">
						{t('links.aboutMe')}
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
