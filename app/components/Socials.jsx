import { Button } from "@/components/ui/button";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FaFacebook, FaGoogle, FaGithub } from "react-icons/fa";
import Link from "next/link";

export default function Socials() {
  return (
    <div className="grid grid-cols-4 gap-2 *:uppercase">
      <Button variant="outline" asChild>
        <Link href="/kakao/start" className="flex gap-x-1">
          <RiKakaoTalkFill size={22} />
          카카오
        </Link>
      </Button>
      <Button variant="outline" asChild>
        <Link href="/google/start" className="flex gap-x-1">
          <FaGoogle size={18} />
          구글
        </Link>
      </Button>
      <Button variant="outline" asChild>
        <Link href="/facebook/start" className="flex gap-x-1">
          <FaFacebook size={20} />
          페이스북
        </Link>
      </Button>
      <Button variant="outline" aschild>
        <Link href="/github/start" className="flex gap-x-1">
          <FaGithub size={20} />
          깃헙
        </Link>
      </Button>
    </div>
  );
}
