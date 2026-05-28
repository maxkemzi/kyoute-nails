'use client';

const GlobalError = ({reset}: {reset: () => void}) => {
	return (
		<html>
			<body className="flex flex-col items-center justify-center min-h-screen gap-4">
				<h2>Something went wrong</h2>
				<button onClick={reset}>Try again</button>
			</body>
		</html>
	);
};

export default GlobalError;
