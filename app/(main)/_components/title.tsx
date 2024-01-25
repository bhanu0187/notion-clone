"use client";

import { useRef, useState } from "react";
import { useMutation } from "convex/react";

import { Doc } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface TitleProps {
	initialData: Doc<"documents">;
}

const Title = ({ initialData }: TitleProps) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const updateDoc = useMutation(api.documents.updateDocument);

	const [title, setTitle] = useState(initialData.title || "untitled");
	const [isUpdating, setIsUpdating] = useState(false);

	const enableInput = () => {
		setTitle(initialData.title);
		setIsUpdating(true);
		setTimeout(() => {
			inputRef.current?.focus();
			inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
		});
	};

	const disableInput = () => {
		setIsUpdating(false);
	};

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(event.target.value);
		updateDoc({
			id: initialData._id,
			title: event.target.value || "untitled",
		});
	};

	const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			disableInput();
		}
	};

	return (
		<div className='flex items-center gap-x-1'>
			{!!initialData.icon && <p>{initialData.icon}</p>}
			{isUpdating ? (
				<Input
					className='h-7 px-2 focous-visible:ring-transparent'
					ref={inputRef}
					onClick={enableInput}
					onBlur={disableInput}
					onChange={onChange}
					onKeyDown={onKeyDown}
				/>
			) : (
				<Button
					onClick={enableInput}
					variant='ghost'
					size='sm'
					className='font-normal h-auto p-1'
				>
					<span className=' truncate'>{initialData.title}</span>
				</Button>
			)}
		</div>
	);
};

export default Title;

Title.Skeleton = function TitleSkeleton() {
	return <Skeleton className='h-9 w-16 rounded-md' />;
};
