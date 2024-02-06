"use client";

import { useTheme } from "next-themes";

import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import { useEdgeStore } from "@/lib/edgestore";

import "@blocknote/react/style.css";
import "@blocknote/core/style.css";

interface EditorProps {
	onChange: (value: string) => void;
	initialContent?: string;
	editable?: boolean;
}

const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
	const { resolvedTheme } = useTheme();
	const { edgestore } = useEdgeStore();

	const uploadHandler = async (file: File) => {
		const response = await edgestore.publicFiles.upload({ file });

		return response.url;
	};
	const editor: BlockNoteEditor = useBlockNote({
		editable,
		initialContent: initialContent
			? (JSON.parse(initialContent) as PartialBlock[])
			: undefined,
		onEditorContentChange: (editor) => {
			onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
		},
		uploadFile: uploadHandler,
	});
	return (
		<div>
			<BlockNoteView
				editor={editor}
				theme={resolvedTheme === "dark" ? "dark" : "light"}
			/>
		</div>
	);
};

export default Editor;
