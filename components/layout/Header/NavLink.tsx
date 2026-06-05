'use client';

import Link, {LinkProps} from 'next/link';
import {ReactNode} from 'react';
import {Typography} from '@/components/ui';
import {usePathname} from 'next/navigation';
import {twJoin} from 'tailwind-merge';

interface Props {
	children?: ReactNode;
	href: LinkProps['href'];
	onClick?: () => void;
}

const NavLink = ({children, href, onClick}: Props) => {
	const pathname = usePathname();

	const isActive = pathname === href;

	return (
		<Link
			className={twJoin(
				"relative inline-block py-4 hover:text-primary hover:after:w-full hover:after:opacity-100 after:content-[''] after:absolute after:transition-all after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-px after:bg-primary after:opacity-0 max-md:py-1.5",
				isActive && 'text-primary after:w-full after:opacity-100',
			)}
			href={href}
			onClick={onClick}
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
