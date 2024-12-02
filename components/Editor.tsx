"use client"; // this registers <Editor> as a Client Component
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
//@ts-ignore
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

type EditorProps = {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
  placeholder?:string
};
export default function Editor({
  onChange,
  editable= true,
  initialContent,
  placeholder
}: EditorProps) {

   
  const editor = useCreateBlockNote({
       initialContent:initialContent ? JSON.parse(initialContent) : '',
       
        
        
  });

  return <BlockNoteView className=""   editable={editable} onChange={()=>onChange(JSON.stringify(editor.document,undefined,2))}  editor={editor}  />;
}
