"use client";

import Image from "next/image";

import { useUser } from "@clerk/nextjs";
import { PlusCircle } from "lucide-react";
import { useMutation } from "convex/react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";

const DocumentPage = () => {
	const router = useRouter();
	const { user } = useUser();
	const create = useMutation(api.documents.create);

	const onCreate = () => {
		const promise = create({ title: "Untitled" }).then(
			(documentId: Id<"documents">) => {
				router.push(`/documents/${documentId}`);
			}
		);

		toast.promise(promise, {
			loading: "Creating a new document...",
			success: "Document created successfully",
			error: "Document creation failed",
			duration: 1000,
		});
	};

	return (
		<div className='h-full flex flex-col items-center justify-center'>
			<Image
				src='/empty.png'
				height='300'
				width='300'
				alt='Empty'
				className='dark:hidden'
			/>
			<Image
				src='/empty-dark.png'
				height='300'
				width='300'
				alt='Empty'
				className='hidden dark:block'
			/>
			<h2 className='text-lg font-medium'>{`Welcome to ${user?.firstName}'s Notion`}</h2>
			<Button
				className='mt-2'
				onClick={onCreate}
			>
				<PlusCircle className='h-4 w-4 mr-2' />
				Create a note
			</Button>
		</div>
	);
};

export default DocumentPage;
