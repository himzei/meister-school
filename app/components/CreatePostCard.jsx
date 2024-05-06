import { Card } from "@/components/ui/card";
import Image from "next/image";
import pfp from "@/public/images/pfp.png";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ImageDown, Link2 } from "lucide-react";

export function CreatePostCard({ subName }) {
  return (
    <Card className="px-4 py-2 flex items-center gap-x-4">
      <Image src={pfp} alt="pfp" className="w-12 h-fit" />

      <Link href={`/r/${subName}/create`} className="w-full">
        <Input placeholder="당신의 생각을 알려주세요!" />
      </Link>

      <div className="flex items-center gap-x-4">
        <Button variant="outline" size="icon">
          <ImageDown className="size-4" />
        </Button>

        <Button variant="outline" size="icon">
          <Link2 className="size-4" />
        </Button>
      </div>
    </Card>
  );
}
