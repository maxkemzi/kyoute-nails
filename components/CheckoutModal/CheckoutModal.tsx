'use client';

import {useCart} from '@/lib/shopify/cartContext';
import {useUploadThing} from '@/lib/uploadthing';
import {useDropzone} from '@uploadthing/react';
import {useCallback, useState} from 'react';
import {Button, Typography} from '../ui';
import {updateCartAttributes} from '@/lib/shopify/cart';
import {twJoin} from 'tailwind-merge';
import {Upload} from 'react-feather';

interface Props {
	onClose: () => void;
}

const CheckoutModal = ({onClose}: Props) => {
	const {cart} = useCart();
	const [file, setFile] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const {startUpload} = useUploadThing('handImage');

	const onDrop = useCallback((accepted: File[]) => {
		const f = accepted[0];
		if (!f) return;
		setFile(f);
		setPreview(URL.createObjectURL(f));
	}, []);

	const {getRootProps, getInputProps, isDragActive} = useDropzone({
		onDrop,
		accept: {'image/*': []},
		maxFiles: 1,
	});

	const handleContinue = async () => {
		if (!cart || !file) return;
		setIsLoading(true);

		try {
			const uploaded = await startUpload([file]);
			const imageUrl = uploaded?.[0]?.ufsUrl;

			if (imageUrl) {
				await updateCartAttributes(cart.id, [
					{key: 'hand_image_url', value: imageUrl},
				]);
			}

			window.open(cart.checkoutUrl, '_blank');
			onClose();
		} finally {
			setIsLoading(false);
		}
	};

	const handleSkip = () => {
		onClose();
	};

	return (
		<>
			{/* Backdrop */}
			<div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />

			{/* Modal */}
			<div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-background rounded-3xl p-8 w-full max-w-md">
				<Typography variant="h3" className="mb-2">
					Upload your hand photo
				</Typography>
				<Typography className="mb-6">
					Help us find the perfect fit by uploading a photo of your hand.
				</Typography>

				{/* Dropzone */}
				<div
					{...getRootProps()}
					className={twJoin(
						'group border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-colors mb-6',
						isDragActive
							? 'border-primary'
							: 'border-border hover:border-primary',
					)}
				>
					<input {...getInputProps()} />
					{preview ? (
						<img
							src={preview}
							alt="Hand preview"
							className="w-full h-48 object-cover rounded-xl"
						/>
					) : (
						<div
							className={twJoin(
								'flex flex-col items-center gap-2 transition-colors',
								isDragActive
									? 'text-primary'
									: 'text-background-foreground/50 group-hover:text-primary',
							)}
						>
							<Upload size={28} strokeWidth={1} />
							<Typography as="span" color="inherit">
								{isDragActive
									? 'Drop here'
									: 'Drag & drop or click to upload'}
							</Typography>
						</div>
					)}
				</div>

				<div className="flex flex-col gap-3">
					<Button
						onClick={handleContinue}
						isDisabled={!file || isLoading}
						className="w-full"
					>
						{isLoading ? 'Uploading...' : 'Continue to checkout'}
					</Button>
					<button
						className="self-center"
						onClick={handleSkip}
						type="button"
					>
						<Typography>Cancel</Typography>
					</button>
				</div>
			</div>
		</>
	);
};

export default CheckoutModal;
