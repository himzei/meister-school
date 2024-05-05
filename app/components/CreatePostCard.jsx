import { Card } from "@/components/ui/card";
import Image from "next/image";
import pfp from "@/public/images/pfp.png";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ImageDown, Link2 } from "lucide-react";

export function CreatePostCard() {
  return (
    <Card className="px-4 py-2 flex items-center gap-x-4">
      <Image src={pfp} alt="pfp" className="w-12 h-fit" />

      <Link href="/r/himzei/create" className="w-full">
        <Input placeholder="Create your post" />
      </Link>

      <div className="flex items-center gap-x-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/r/himzei/create">
            <ImageDown className="size-4" />
          </Link>
        </Button>

        <Button variant="outline" size="icon" asChild>
          <Link href="/r/himzei/crate">
            <Link2 className="size-4" />
          </Link>
        </Button>
      </div>
    </Card>
  );
}
