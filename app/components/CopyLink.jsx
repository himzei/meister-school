"use client";

import { useToast } from "@/components/ui/use-toast";
import { Share } from "lucide-react";

export function CopyLink({ id }) {
  const { toast } = useToast();
  async function copyToClipboard() {
    await navigator.clipboard.writeText(`${location.origin}/post/${id}`);

    toast({
      title: "Success",
      description: "공유하려는 페이지의 링크가 복사되었습니다!",
    });
  }
  return (
    <button className="flex items-center gap-x-1" onClick={copyToClipboard}>
      <Share className="size-4 text-muted-foreground" />
      <p className="text-muted-foreground font-medium text-xs">공유</p>
    </button>
  );
}
