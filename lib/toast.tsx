import {Toast, ToastProps} from '@/components/ui';
import {toast as sonnerToast} from 'sonner';

const toast = (variant: ToastProps['variant'], title: ToastProps['title']) => {
	return sonnerToast.custom(id => (
		<Toast id={id} variant={variant} title={title} />
	));
};

toast.error = (title: ToastProps['title']) => toast('error', title);
toast.success = (title: ToastProps['title']) => toast('success', title);
toast.info = (title: ToastProps['title']) => toast('info', title);

export {toast};
