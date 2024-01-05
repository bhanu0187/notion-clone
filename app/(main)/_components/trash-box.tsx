"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useQuery, useMutation } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { Search, Trash, Undo2 } from "lucide-react";

import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { Spinner } from "@/components/spinner";
import { Input } from "@/components/ui/input";
import { ConfirmModal } from "@/components/modals/confirm-modal";

const TrashBox = () => {
	const router = useRouter();
	const params = useParams();
	const document = useQuery(api.documents.getArchivedData);
	const restoreDocument = useMutation(api.documents.restore);
	const removeDocument = useMutation(api.documents.deleteDocument);

	const [search, setSearch] = useState("");

	const filteredDocuments = document?.filter((document) => {
		return document.title.toLowerCase().includes(search.toLowerCase());
	});

	const onClick = (documentId: string) => {
		router.push(`/documents/${documentId}`);
	};

	const onRestore = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>,
		documentId: Id<"documents">
	) => {
		event.stopPropagation();
		const promise = restoreDocument({ id: documentId });

		toast.promise(promise, {
			loading: "Restoring document...",
			success: "Document restored successfully",
			error: "Failed to restore document",
		});
	};

	const onRemove = (documentId: Id<"documents">) => {
		const promise = removeDocument({ id: documentId });

		toast.promise(promise, {
			loading: "Deleting document...",
			success: "Document Deleted successfully",
			error: "Failed to Delete document",
		});

		if (params.documentId === documentId) {
			router.push("/document");
		}
	};

	if (document === undefined) {
		return (
			<div className='h-full flex items-center justify-center p-4'>
				<Spinner size='lg' />
			</div>
		);
	}

	return (
		<div className='text-sm'>
			<div className='flex items-center gap-x-1 p-2'>
				<Search className='h-4 e-4' />
				<Input
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className='h-7 px-2 focus-visible:ring-transparent bg-secondary'
					placeholder='Filter by page title...'
				/>
			</div>
			<div className='mt-2 px-1 pb-1'>
				<p className='hidden last:block text-xs text-center text-muted-foreground pb-2'>
					No documents found
				</p>
				{filteredDocuments?.map((document) => (
					<div
						key={document._id}
						role='button'
						onClick={() => onClick(document._id)}
						className='text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between'
					>
						<span className='truncate pl-2'>{document.title}</span>
						<div className='flex items-center'>
							<div
								onClick={(e) => onRestore(e, document._id)}
								role='button'
								className='rounded-sm p-2 hover:bg-neutral-500'
							>
								<Undo2 className='h-4 w-4 text-muted-foreground' />
							</div>
							<ConfirmModal onConfirm={() => onRemove(document._id)}>
								<div
									role='button'
									className='rounded-sm p-2 hover:bg-neutral-500'
								>
									<Trash className='h-4 w-4 text-muted-foreground' />
								</div>
							</ConfirmModal>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default TrashBox;
