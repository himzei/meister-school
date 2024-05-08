import { CopyLink } from "@/app/components/CopyLink";
import LocalMenus from "@/app/components/LocalMenus";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CiCalendarDate } from "react-icons/ci";

export default function NoticePage() {
  return (
    <>
      <LocalMenus firstLocal="커뮤니티" secondLocal="공지사항" />
      <div className="custom-width flex flex-col">
        {/* 제목 */}
        <div className="flex flex-col text-center gap-2 mb-8">
          <h1 className="text-3xl font-bold text-center">공지사항</h1>
          <p className="text-sm text-muted-foreground">
            미래유망분야 경북 바이오 마이스터 고등학교 공지사항을 확인하세요!
          </p>
        </div>

        <div className="flex flex-col gap-y-4">
          <Separator className="h-0.5 bg-muted my-1" />
          <div className="flex w-full justify-between items-center h-20 px-2">
            {/* 포스트 제목 */}
            <div className="flex flex-col gap-y-1">
              <h1 className="text-3xl tracking-tight font-bold">
                경북 바이오 마이스터 고등학교
              </h1>
            </div>
            <div className="flex gap-x-4">
              <div className="text-muted-foreground text-xs font-medium flex gap-x-2 items-center">
                <CiCalendarDate size="20" />
                2024-05-11
              </div>
              <CopyLink />
            </div>
          </div>

          {/* picture */}
          <div className="flex flex-col gap-y-10">
            <div className="w-full aspect-video bg-muted rounded-xl"></div>

            {/* 컨텐츠 */}

            <div>
              실물 프로그램북은 공연당일 한정판매로 진행됩니다. <br />
              ※프로그램북의 모든 저작권은 대구오페라하우스에 있으며, 무단 복제
              및 사용을 금합니다.
              <br />
              <br />
              ※온라인 프로그램북은 공연 종료 후 일주일동안 게시가 유지되며,
              이후에는 비공개로 전환됩니다.
              <br />
              <br />
              <br />
              실물 프로그램북은 공연당일 한정판매로 진행됩니다. <br />
              ※프로그램북의 모든 저작권은 대구오페라하우스에 있으며, 무단 복제
              및 사용을 금합니다.
              <br />
              <br />
              ※온라인 프로그램북은 공연 종료 후 일주일동안 게시가 유지되며,
              이후에는 비공개로 전환됩니다.
            </div>
          </div>

          {/*  */}
          <Separator className="my-5" />
        </div>
      </div>
    </>
  );
}
