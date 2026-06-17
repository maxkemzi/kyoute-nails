import {RenderOptions, render as rtlRender} from '@testing-library/react';
import {NextIntlClientProvider} from 'next-intl';
import {ReactNode} from 'react';
import messages from './messages/en.json';

const render = (ui: ReactNode, renderOptions: RenderOptions = {}) => {
	const Wrapper = ({children}: {children: ReactNode}) => {
		return (
			<NextIntlClientProvider locale="en" messages={messages}>
				{children}
			</NextIntlClientProvider>
		);
	};

	return rtlRender(ui, {wrapper: Wrapper, ...renderOptions});
};

export {render};
