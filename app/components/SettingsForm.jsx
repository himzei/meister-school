/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { updateUserImage, updateUserInfo } from "../actions";
import { SubmitButton } from "./SubmitButton";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";

export function SettingsFrom({ name, phone, avatar, email }) {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [preview, setPreview] = useState("");
  const [state, formAction] = useFormState(updateUserInfo, null);

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

  const onImageChange = async (e) => {
    const {
      target: { files },
    } = e;
    if (!files) return;

    const file = files[0];
    const url = URL.createObjectURL(file);
    setPreview(url);

    const { data: imageData, error } = await supabase.storage
      .from("avatar")
      .upload(`${Date.now()}`, file, {
        cacheControl: "2592000",
      });

    const {
      data: { publicUrl },
    } = supabase.storage.from("avatar").getPublicUrl(`${imageData?.path}`);

    setAvatarUrl(publicUrl);
    updateUserImage({ publicUrl });
  };

  return (
    <form action={formAction} className="py-8">
      <h1 className="text-2xl font-extrabold tracking-tight">설정</h1>

      <p className="text-muted-foreground text-sm">
        이 페이지에서 프로필을 변경할 수 있습니다!
      </p>
      <Separator className="my-4" />
      <container className="flex flex-col gap-y-4">
        {/* 프로필 */}
        {preview === "" ? (
          <div>
            <label htmlFor="avatar">
              <img
                src={
                  avatar ??
                  "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                }
                alt="avatar of user"
                className="rounded-full size-32 hidden lg:block cursor-pointer"
              />
            </label>
            <input
              type="file"
              className="hidden"
              name="avatar"
              id="avatar"
              onChange={onImageChange}
            />
          </div>
        ) : (
          <div className="size-32 rounded-full overflow-hidden">
            <img
              src={preview}
              alt="preveiw"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        {/* 이름 */}
        <div>
          <Label className="px-1 font-semibold text-lg">이름</Label>

          <Input
            defaultValue={name}
            name="name"
            required
            className="mt-2"
            min={2}
            maxLength={21}
          />
        </div>
        <div>
          <Label className="px-1 font-semibold text-lg">이메일</Label>
          <Input
            defaultValue={email}
            name="email"
            required
            className="mt-2"
            min={2}
            maxLength={21}
          />
        </div>
        {/* 모바일 */}
        <div>
          <Label className="px-1 font-semibold text-lg">휴대폰</Label>
          <Input
            defaultValue={phone}
            name="phone"
            required
            className="mt-2"
            min={2}
            maxLength={21}
          />
          <p className="text-muted-foreground text-sm px-2 pt-1">
            (-) 없이 숫자로만 입력해 주세요!
          </p>
        </div>
      </container>
      <div className="w-full flex mt-5 gap-x-2 justify-end items-center">
        <Button variant="secondary" asChild type="button">
          <Link href="/">취소</Link>
        </Button>
        <SubmitButton text="변경" />
      </div>
    </form>
  );
}
