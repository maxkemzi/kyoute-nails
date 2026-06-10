'use client';

import {ReactNode, useCallback, useEffect, useRef, useState} from 'react';
import {twMerge} from 'tailwind-merge';
import {DropdownContext} from './dropdownContext';

interface Props {
	children?: ReactNode;
	className?: string;
	listClassName?: string;
	trigger: ReactNode;
	value?: string;
}

const Dropdown = ({
	children,
	className,
	listClassName,
	trigger,
	value,
}: Props) => {
	const ref = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState(false);

	const close = useCallback(() => setIsOpen(false), []);
	const toggle = useCallback(() => setIsOpen(prev => !prev), []);

	// Close on outside click
	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				close();
			}
		};
		document.addEventListener('mousedown', handleClick);
		return () => document.removeEventListener('mousedown', handleClick);
	}, [close]);

	// Close on Escape
	useEffect(() => {
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') close();
		};
		document.addEventListener('keydown', handleKey);
		return () => document.removeEventListener('keydown', handleKey);
	}, [close]);

	// Focus first item on open
	useEffect(() => {
		if (!isOpen) return;

		const firstItem = ref.current?.querySelector<HTMLButtonElement>(
			'ul button:not(:disabled)',
		);
		firstItem?.focus();
	}, [isOpen]);

	return (
		<DropdownContext value={{value, onClose: close}}>
			<div ref={ref} className={twMerge('relative', className)}>
				<button
					className="w-full"
					onClick={toggle}
					aria-haspopup="menu"
					aria-expanded={isOpen}
				>
					{trigger}
				</button>

				{isOpen ? (
					<ul
						role="menu"
						className={twMerge(
							'absolute top-[calc(100%+6px)] right-0 min-w-full max-w-[320px] shadow-border bg-background rounded-xl py-1.5 z-10 max-xxs:max-w-[calc(100vw-32px)] ',
							listClassName,
						)}
					>
						{children}
					</ul>
				) : null}
			</div>
		</DropdownContext>
	);
};

export default Dropdown;
