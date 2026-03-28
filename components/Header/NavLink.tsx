'use client';

import Link, {LinkProps} from 'next/link';
import {ReactNode} from 'react';
import {Typography} from '../ui';
import {usePathname} from 'next/navigation';
import {twJoin} from 'tailwind-merge';

interface Props {
	children?: ReactNode;
	href: LinkProps['href'];
}

const NavLink = ({children, href}: Props) => {
	const pathname = usePathname();

	const isActive = pathname === href;

	return (
		<Link
			className={twJoin(
				"relative inline-block py-4 hover:text-primary hover:after:w-full hover:after:opacity-100 after:content-[''] after:absolute after:transition-all after:duration-300 after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-px after:bg-primary after:opacity-0",
				isActive && 'text-primary after:w-full after:opacity-100',
			)}
			href={href}
		>
			<Typography
				className="transition-colors"
				color="inherit"
				textTransform="uppercase"
				as="span"
			>
				{children}
			</Typography>
		</Link>
	);
};

export default NavLink;
