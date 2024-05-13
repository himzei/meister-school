import { Button } from "@/components/ui/button";
import { RiKakaoTalkFill } from "react-icons/ri";

import Link from "next/link";

export default function Socials() {
  return (
    <div className="flex w-full *:uppercase">
      <Button variant="outline" asChild>
        <Link href="/kakao/start" className="flex w-full gap-2 bg-[#FEE501]">
          <RiKakaoTalkFill size={22} />
          <span className="text-[#191919]">카카오로 로그인</span>
        </Link>
      </Button>
      {/* <Button variant="outline" asChild>
        <Link href="/naver/start" className="flex gap-x-1">
          <SiNaver size={16} />
          네이버
        </Link>
      </Button>
      <Button variant="outline" asChild>
        <Link href="/google/start" className="flex gap-x-1">
          <FaGoogle size={18} />
          구글
        </Link>
      </Button>

      <Button variant="outline" aschild>
        <Link href="/github/start" className="flex gap-x-1">
          <FaGithub size={20} />
          깃헙
        </Link>
      </Button> */}
    </div>
  );
}
