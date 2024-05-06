import { Button } from "@/components/ui/button";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FaFacebook, FaGoogle, FaGithub } from "react-icons/fa";
import Link from "next/link";

export default function Socials() {
  return (
    <div className="grid grid-cols-4 gap-2 *:uppercase">
      <Button variant="outline" className="flex">
        <RiKakaoTalkFill size={22} />
        카카오
      </Button>
      <Button variant="outline" className="flex">
        <FaGoogle size={18} />
        구글
      </Button>
      <Button variant="outline" className="flex">
        <FaFacebook size={20} />
        페이스북
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
