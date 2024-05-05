import { Button } from "@/components/ui/button";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FaFacebook, FaGoogle, FaGithub } from "react-icons/fa";

export default function Socials() {
  return (
    <div className="grid grid-cols-4 gap-2 *:uppercase *:gap-1.5">
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
      <Button variant="outline" className="flex">
        <FaGithub size={20} />
        깃헙
      </Button>
    </div>
  );
}
