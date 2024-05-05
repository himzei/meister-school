"use client";
import { Button } from "@/components/ui/button";
import { useEditor, EditorContent, JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export const Menubar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 mt-5">
      <Button
        size="sm"
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        variant={
          editor.isActive("heading", { level: 1 }) ? "default" : "secondary"
        }
      >
        아주크게
      </Button>
      <Button
        size="sm"
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        variant={
          editor.isActive("heading", { level: 2 }) ? "default" : "secondary"
        }
      >
        크게
      </Button>
      <Button
        size="sm"
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        variant={
          editor.isActive("heading", { level: 3 }) ? "default" : "secondary"
        }
      >
        조금크게
      </Button>
      <Button
        size="sm"
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        variant={editor.isActive("bold") ? "default" : "secondary"}
      >
        굵게
      </Button>
      <Button
        size="sm"
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        variant={editor.isActive("italic") ? "default" : "secondary"}
      >
        기울임
      </Button>
      <Button
        size="sm"
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        variant={editor.isActive("strike") ? "default" : "secondary"}
      >
        수정됨
      </Button>
    </div>
  );
};

export function TipTapEditor({ setJson, json }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: json ?? "",
    editorProps: {
      attributes: {
        class: "prose",
      },
    },
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      setJson(json);
    },
  });
  return (
    <div>
      <Menubar editor={editor} />
      <EditorContent
        editor={editor}
        className="rounded-lg border p-2 min-h-[200px] mt-2"
      />
    </div>
  );
}
