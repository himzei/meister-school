import { DrawOutlineButton } from "@/app/components/DrawOutlineButton";
import Pagination from "@/app/components/Pagination";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function CommunityPage() {
  return (
    <div className="custom-width flex flex-col">
      <div className="flex flex-col text-center gap-2 mb-8">
        <h1 className="text-3xl font-bold text-center">공지사항</h1>
        <p className="text-sm text-muted-foreground">
          미래유망분야 경북 바이오 마이스터 고등학교 공지사항을 확인하세요!
        </p>
      </div>

      <div className="flex flex-col gap-y-1">
        <Separator className="h-0.5 bg-muted-foreground my-1" />
        <div className="flex flex-col gap-0.5">
          {Array(15)
            .fill("")
            .map((_, i) => (
              <Link href="/community/id" key={i}>
                <DrawOutlineButton>
                  <div className="px-2 flex justify-between items-center w-full">
                    {/* 날짜 제목 */}
                    <div className="flex items-center">
                      {/* 날짜 */}
                      <div className="flex flex-col w-20 aspect-square justify-center items-center tracking-tight">
                        <p className="font-raleway text-xl">05.05</p>
                        <p className="font-raleway text-sm font-light text-muted-foreground">
                          2024
                        </p>
                      </div>
                      {/* separator */}
                      <div className="w-[1px] h-6 bg-neutral-300 mx-2" />
                      {/* 제목 */}
                      <div className="flex gap-x-2 px-3">
                        <Badge>공지</Badge>
                        <h1 className="tracking-tight">
                          경북 바이오 마이스터고등학고 미래유망분야 인력양성
                        </h1>
                      </div>
                    </div>
                    {/* 버튼 */}
                    <div className="px-2">자세히보기</div>
                  </div>
                </DrawOutlineButton>
                <Separator className="my-0.5" />
              </Link>
            ))}
        </div>
      </div>
      {/* 페이지 네이션 */}
      <div className="py-4">
        <Pagination totalPages="5" />
      </div>
    </div>
  );
}
