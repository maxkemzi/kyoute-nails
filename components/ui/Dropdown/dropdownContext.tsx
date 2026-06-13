'use client';

import {createContext, useContext} from 'react';

interface DropdownContextValue {
	value?: string;
	onClose?: () => void;
}

export const DropdownContext = createContext<DropdownContextValue | null>(null);

export const useDropdownContext = () => {
	const ctx = useContext(DropdownContext);
	if (!ctx)
		throw new Error('useDropdownContext must be used inside <Dropdown>');
	return ctx;
};
