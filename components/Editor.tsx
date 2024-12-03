"use client"; // this registers <Editor> as a Client Component
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
 
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type EditorProps = {
  onChange: (value: string) => void;
  initialContent?: string;
  className?:string
  editable?: boolean;
  placeholder?: string;
  theme?: {
    colors: {
      editor: {
        text: string;
        background: string;
      };
    };
  };
};
export default function Editor({
  onChange,
  editable = true,
  initialContent,
  theme,
  className,
  placeholder,
}: EditorProps) {
  const editor = useCreateBlockNote({
    initialContent: initialContent ? JSON.parse(initialContent) : "",
  });

  const [mount, setMount] = useState(false)

  useEffect(()=>{setMount(true)},[])

  if(!mount) return 
  return (
    <BlockNoteView  
      className={cn('',className)}
      editable={editable}
      onChange={() => onChange(JSON.stringify(editor.document, undefined, 2))}
      editor={editor}
      theme={theme}
    />
  );
}
