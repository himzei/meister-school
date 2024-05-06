"use client";

import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import pfp from "@/public/images/pfp.png";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Text, Video } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TipTapEditor } from "@/app/components/TipTapEditor";
import { SubmitButton } from "@/app/components/SubmitButton";
import { useState } from "react";
import { UploadFile } from "@/app/components/UploadFile";
import { createPost } from "@/app/actions";

const rules = [
  {
    id: 1,
    text: "토론방에 당신의 생각을 작성해 주세요",
  },
  {
    id: 2,
    text: "로그인 사용자만 작성이 가능합니다!",
  },
  {
    id: 3,
    text: "이미지/비디오는 최대 4MB까지 가능!",
  },
  {
    id: 4,
    text: "욕/상대방을 비방하는 내용은 삭제 됩니다!",
  },
  {
    id: 5,
    text: "레딧으로 건전한 토론을 시작하세요!",
  },
];

export default function CreatePostRoute({ params }) {
  const [imageUrl, setImageUrl] = useState("");
  const [json, setJson] = useState(null);
  const [title, setTitle] = useState(null);

  const [file, setFile] = useState(null);
  const [imageId, setImageId] = useState(null);

  const interceptAction = async (formData) => {
    const cloudflareForm = new FormData();
    cloudflareForm.append("file", file);

    await fetch(imageUrl, {
      method: "POST",
      body: cloudflareForm,
    });

    const photoUrl = `https://imagedelivery.net/N-UcEUejRMIK2RZhJ4DnqA/${imageId}`;

    formData.set("photoUrl", imageId ? photoUrl : "");

    return createPost({ jsonContent: json }, formData);
  };

  return (
    <div className="custom-width flex gap-x-10">
      <div className="w-[70%] flex flex-col gap-y-5">
        <h1 className="font-semibold">
          토론방(Subreddit):{" "}
          <Link href={`/r/${params.id}`} className="text-primary">
            r/{params.id}
          </Link>
        </h1>
        <Tabs defaultValue="post" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="post">
              <Text className="size-4 mr-2" />
              포스트
            </TabsTrigger>
            <TabsTrigger value="image">
              <Video className="size-4 mr-2" />
              이미지/비디오
            </TabsTrigger>
          </TabsList>

          <TabsContent value="post">
            <Card>
              <form action={interceptAction}>
                <input type="hidden" name="subName" value={params.id} />
                <CardHeader>
                  <Label>제목</Label>
                  <Input
                    required
                    name="title"
                    placeholder="제목을 작성해 주세요!"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />

                  <TipTapEditor setJson={setJson} json={json} />
                </CardHeader>
                <CardFooter>
                  <SubmitButton text="글 작성하기" />
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="image">
            <UploadFile
              setImageUrl={setImageUrl}
              setImageId={setImageId}
              setFile={setFile}
            />
          </TabsContent>
        </Tabs>
      </div>
      <div className="w-[30%]">
        <Card className="flex flex-col p-4">
          <div className="flex items-center gap-x-2">
            <Image src={pfp} alt="pff" className="size-10" />
            <h1 className="font-medium">마이스터 레디터 환영해요</h1>
          </div>

          <Separator className="mt-2" />
          <div className="flex flex-col gap-y-5 mt-5">
            {rules.map((item) => (
              <div key={item.id}>
                <p className="text-sm font-medium pl-2">
                  {item.id}. {item.text}
                </p>
                <Separator className="mt-2" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
