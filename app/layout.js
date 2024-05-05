/* eslint-disable @next/next/no-img-element */
import "./globals.css";
import { Inter } from "next/font/google";
import { NavBar } from "./components/NavBar";
import { Toaster } from "@/components/ui/toaster";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "미래유망분야 바이오 마이스터고",
  description:
    "미래유망분야 고졸인력양성사업 경북 바이오마이스터 고등학교에 오신 것을 환영합니다!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />

        <div className="grid grid-cols-[80px_1fr_80px] relative ">
          {/* 왼쪽 */}
          <div className="w-full h-full border-r border-neutral-300 py-20 gap-y-8 top-0">
            <div className="sticky top-20 flex  flex-col items-center gap-y-8 *:rounded-full *:overflow-hidden *:size-8 *:flex *:justify-center *:items-center">
              <div>
                <img
                  src="https://www.oss.kr/plugins/oss/components/Modules/DeveloperCompetition/assets/img/kakao_plus2.png"
                  alt="kakao-icon"
                  className="hover:scale-110 transition-all"
                />
              </div>
              <div className="">
                <img
                  src="https://mblogthumb-phinf.pstatic.net/MjAyMDA5MjRfMTQ0/MDAxNjAwOTI4MDIxMTQ4.LGGIcSU4FrU6c_-MgA5xerYp1KXlF290JkqaG9uTPskg.MHNU4ycUh0ivOCxgEDo6YWorwOtonE7zwtmJMr1I3RAg.PNG.thdnjs4484/%EB%B8%94%EB%A1%9C%EA%B7%B81.png?type=w800"
                  alt="naver-icon"
                  className="hover:scale-110 transition-all"
                />
              </div>
              <div className="">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/124/124010.png"
                  alt="naver-icon"
                  className="hover:scale-110 transition-all"
                />
              </div>
              <div className="">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTeY4N-8_veM7JEEIwY70evm_Ac7ScKI852YYKz6ZMkg&s"
                  alt="naver-icon"
                  className="hover:scale-110 transition-all"
                />
              </div>
              <div className="">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWjXoQ_Ua751OYjAmKrh9y7sUWA0047wMxp41zmxgunw&s"
                  alt="naver-icon"
                  className="hover:scale-110 transition-all"
                />
              </div>
            </div>
          </div>
          {/* 중앙 */}
          <div className="flex flex-col">
            <div className="min-h-[calc(100vh-300px)]">{children}</div>
            <Footer />
          </div>
          {/* 오른쪽 */}
          <div className="w-full border-l border-neutral-300"></div>
        </div>

        <Toaster />
      </body>
    </html>
  );
}
