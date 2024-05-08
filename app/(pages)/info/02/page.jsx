/* eslint-disable @next/next/no-img-element */
import LocalMenus from "@/app/components/LocalMenus";
import Image from "next/image";

export default function Info2() {
  return (
    <div>
      {/* 로컬 네비게이션 */}
      <LocalMenus firstLocal="과정안내" secondLocal="과정안내" />
      {/* 제목 */}
      <div className="custom-width flex flex-col">
        <div className="flex flex-col text-center gap-2">
          <h1 className="text-3xl font-bold text-center">과정안내</h1>
          <p className="text-sm text-muted-foreground">
            미래유망분야 경북 바이오 마이스터 고등학교 수업일정을 확인하세요!
          </p>
        </div>
      </div>

      {/* 메인 이미지 */}
      <div className="max-w-[1800px] w-full h-[400px] bg-muted mx-auto overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1503039153293-d4d2ba067754?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="과정안내"
          className="object-cover object-center"
        />
      </div>

      {/* 본문 글 */}
      <div className="custom-width grid grid-cols-[1fr_2fr] gap-10">
        <div>1</div>
        <div>2</div>
      </div>
    </div>
  );
}
