import {generateReactHelpers} from '@uploadthing/react';
import {createUploadthing, FileRouter} from 'uploadthing/next';

const f = createUploadthing();

export const ourFileRouter = {
	handImage: f({
		image: {maxFileSize: '4MB', maxFileCount: 1},
	}).onUploadComplete(({file}) => {
		console.log('Uploaded:', file.url);
	}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

export const {useUploadThing, uploadFiles} =
	generateReactHelpers<OurFileRouter>();
