import {ReactNode} from 'react';

const Section = ({children}: {children: ReactNode}) => {
	return (
		<section className="py-20 max-lg:py-16 max-md:py-12">{children}</section>
	);
};

export default Section;
