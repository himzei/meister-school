"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "./SubmitButton";
import { createComment } from "../actions";
import { useRef } from "react";

export function CommentForm({ postId }) {
  const ref = useRef(null);
  return (
    <form
      className="mt-5"
      action={async (formData) => {
        await createComment(formData);
        ref.current?.reset();
      }}
      ref={ref}
    >
      <input type="hidden" name="postId" value={postId} />
      <Label>댓글 작성하기</Label>
      <Textarea
        placeholder="당신의 생각을 댓글로 표현해주세요!"
        className="w-full mt-1 mb-2"
        name="comment"
      />
      <SubmitButton text="댓글작성" />
    </form>
  );
}
