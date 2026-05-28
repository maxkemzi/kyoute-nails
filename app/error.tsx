'use client';

import {Button, Typography} from '@/components/ui';

const Error = ({
	error,
	reset,
}: {
	error: Error & {digest?: string};
	reset: () => void;
}) => {
	return (
		<div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
			<Typography variant="h3">Something went wrong</Typography>
			<Typography color="danger">{error.message}</Typography>
			<Button onClick={reset}>Try again</Button>
		</div>
	);
};

export default Error;
