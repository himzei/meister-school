"use client";

import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export function SubmitButton({ text }) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled>
          <Loader2 className="mr-2 size-4 animate-spin" />
        </Button>
      ) : (
        <Button size="sm" className="" type="submit">
          {text}
        </Button>
      )}
    </>
  );
}

export function SaveButton({ text }) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button className="w-full mt-2" disabled size="sm">
          <Loader2 className="mr-2 size-4 animate-spin" />
        </Button>
      ) : (
        <Button size="sm" className="w-full mt-2" type="submit">
          {text}
        </Button>
      )}
    </>
  );
}

export function UpVote() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button variant="outline" size="icon" disabled>
          <Loader2 className="size-4 animate-spin" />
        </Button>
      ) : (
        <Button variant="outline" size="sm" type="submit">
          <ArrowUp className="size-4" />
        </Button>
      )}
    </>
  );
}

export function DownVote() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button variant="outline" size="icon" disabled>
          <Loader2 className="size-4 animate-spin" />
        </Button>
      ) : (
        <Button variant="outline" size="sm" type="submit">
          <ArrowDown className="size-4" />
        </Button>
      )}
    </>
  );
}
