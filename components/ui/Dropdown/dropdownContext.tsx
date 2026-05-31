'use client';

import {createContext, useContext} from 'react';

interface DropdownContextValue {
	value?: string;
	onClose?: () => void;
}

export const DropdownContext = createContext<DropdownContextValue>({});

export const useDropdownContext = () => useContext(DropdownContext);
