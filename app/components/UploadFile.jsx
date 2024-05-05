/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CloudUpload } from "lucide-react";
import { useState } from "react";
import { getUploadUrl } from "../actions";

export function UploadFile({ setImageUrl, setFile, setImageId }) {
  const [preview, setPreview] = useState("");

  const onImageChange = async (e) => {
    const {
      target: { files },
    } = e;
    if (!files) return;

    const file = files[0];
    const url = URL.createObjectURL(file);
    setPreview(url);

    const { success, result } = await getUploadUrl();
    if (success) {
      const { id, uploadURL } = result;
      setImageUrl(uploadURL);
      setFile(file);
      setImageId(id);
    }
  };

  return (
    <Card className="px-4 py-6">
      <div className="w-full border border-muted-foreground border-dashed flex justify-center items-center flex-col gap-y-4 min-h-[400px]">
        {preview === "" ? (
          <>
            {/* 1 */}
            <CloudUpload className="size-10 text-muted-foreground" />
            {/* 2 */}
            <div className="flex flex-col gap-y-1 text-center">
              <h2 className="text-primary font-semibold">Image & Video</h2>
              <p className="text-muted-foreground text-sm">
                업로드 할 사진 파일 / 동영상 파일을 선택해 주세요!
              </p>
            </div>
            {/* 3 */}

            <Button asChild className="cursor-pointer">
              <label htmlFor="photo">파일선택</label>
            </Button>
            <input
              type="file"
              className="hidden"
              id="photo"
              name="photo"
              onChange={onImageChange}
            />
          </>
        ) : (
          <div className="w-full h-full overflow-hidden">
            <img
              src={preview}
              alt="preview"
              className="w-full h-full object-cover object-center"
            />
          </div>
        )}
      </div>
    </Card>
  );
}
