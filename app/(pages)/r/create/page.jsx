"use client";

import { createCommunity } from "@/app/actions";
import LocalMenus from "@/app/components/LocalMenus";
import { SubmitButton } from "@/app/components/SubmitButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useEffect } from "react";
import { useFormState } from "react-dom";

export default function SubredditPage() {
  const [state, formAction] = useFormState(createCommunity, null);
  const { toast } = useToast();
  useEffect(() => {
    if (state?.status === "error") {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast]);

  return (
    <>
      <LocalMenus firstLocal="레딧" secondLocal="토론방 만들기" />
      <div className="custom-width flex flex-col ">
        <form action={formAction}>
          <h1 className="text-2xl font-extrabold tracking-tight">
            토론방 만들기
          </h1>
          <Separator className="my-4" />

          <Label className="text-lg font-bold">토론방 이름</Label>
          <p className="text-muted-foreground text-xs">
            토론방 이름은 반드시 영문으로 작성해 주세요!
          </p>

          <div className="relative mt-3">
            <p className="absolute left-0 w-8 flex items-center justify-center h-full text-muted-foreground">
              r/
            </p>
            <Input
              name="name"
              required
              className="pl-6"
              maxLength={21}
              minLength={2}
            />
          </div>
          <p className="text-destructive text-sm mt-2">{state?.message}</p>

          <div className="w-full flex justify-end mt-5 gap-x-3">
            <Button asChild variant="secondary">
              <Link href="/">취소</Link>
            </Button>
            <SubmitButton text="만들기" />
          </div>
        </form>
      </div>
    </>
  );
}
