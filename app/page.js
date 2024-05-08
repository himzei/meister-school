import { Card } from "@/components/ui/card";
import { MainSlide } from "./components/MainSlide";
import { Separator } from "@/components/ui/separator";
import { CarouselReddit } from "./components/CarouselReddit";
import { DrawOutlineButton } from "./components/DrawOutlineButton";

export default function Home() {
  return (
    <>
      <div>
        <MainSlide />
      </div>

      {/* 섹션 2 */}
      <div className="custom-width grid grid-cols-[2fr_1fr] gap-10 py-4">
        {/* 공지사항 */}
        <div className="flex flex-col gap-y-5">
          {/* 제목 */}
          <div className="flex flex-col">
            <p className=" tracking-tighter font-extralight uppercase text-muted-foreground">
              notice
            </p>
            <h1 className="text-3xl font-light tracking-tight">공지사항</h1>
            <Separator className="my-2" />
          </div>
          {/* 글 보기 */}
          <div className="flex flex-col gap-y-2 ">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <>
                  <DrawOutlineButton key={i}>
                    <div
                      key={i}
                      className="flex justify-between items-center w-full py-1"
                    >
                      <h2>경북 바이오 마이스터 고등학교 </h2>
                      <p className="text-sm">2024-05-05</p>
                    </div>
                  </DrawOutlineButton>
                </>
              ))}
          </div>
        </div>

        {/* 아카데미 */}
        <div className="flex flex-col gap-y-5">
          {/* 제목 */}
          <div className="flex flex-col">
            <p className=" tracking-tighter font-extralight uppercase text-muted-foreground">
              academy
            </p>
            <h1 className="text-3xl font-light tracking-tight">아카데미</h1>
            <Separator className="my-2" />
          </div>
          <div className="flex flex-col gap-y-4">
            <p className="text-muted-foreground">
              ‘디지털 바이오 혁신 전략’을 통해 국가 바이오 기술·산업 경쟁력을
              확보을 위한 미래유망분야 고졸인력 양성사업을 추진
            </p>
            <div className="w-full grid grid-cols-2 gap-3">
              <div className="bg-muted w-full h-20">1</div>
              <div className="bg-muted w-full h-20">2</div>
              <div className="bg-muted w-full h-20">3</div>
              <div className="bg-muted w-full h-20">4</div>
            </div>
          </div>
        </div>
      </div>

      {/* 섹션 3 */}
      <CarouselReddit />
    </>
  );
}
