import {useCallback, useRef} from 'react';

const useDebouncedCallback = <T extends (...args: never[]) => Promise<void>>(
	fn: T,
	delay: number,
): T => {
	const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
	const fnRef = useRef(fn);

	return useCallback(
		(...args: Parameters<T>) => {
			if (timer.current) clearTimeout(timer.current);
			timer.current = setTimeout(() => fnRef.current(...args), delay);
		},
		[delay],
	) as T;
};

export default useDebouncedCallback;
