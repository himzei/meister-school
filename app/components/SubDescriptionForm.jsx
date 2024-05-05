"use client";

import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { SaveButton } from "./SubmitButton";
import { updateSubDescription } from "../actions";
import { useFormState } from "react-dom";

const initalState = {
  message: "",
  status: "",
};

export function SubDescriptionForm({ description, subName }) {
  const [state, formAction] = useFormState(updateSubDescription, initalState);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.status === "green") {
      toast({
        title: "업데이트 성공!",
        description: state.message,
      });
    } else if (state?.status === "error") {
      toast({
        title: "업데이트 실패",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast]);

  return (
    <form className="mt-3" action={formAction}>
      <input type="hidden" name="subName" value={subName} />
      <Textarea
        placeholder="토론방에 대한 설명을 작성해 주세요!"
        maxLength={100}
        name="description"
        defaultValue={description}
      />

      <SaveButton text="저장" />
    </form>
  );
}
