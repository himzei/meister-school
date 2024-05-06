import { menus } from "../..//lib/menus";
import Link from "next/link";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { NavLink } from "./NavLink";
import { getUser } from "../actions";
import { UserDropdown } from "./UserDropdown";

export async function NavBar() {
  const user = await getUser();

  return (
    <div className="border-b border-neutral-300 px-20">
      <div className="h-[100px] relative flex justify-between items-center">
        {/*  */}
        <Link href="/">
          <Logo />
        </Link>

        {/* 로그인 / 로그아웃 */}
        {user?.id ? (
          <UserDropdown userImage={user.avatar} email={user.email} />
        ) : (
          <div className="*:uppercase flex items-center">
            <Button variant="ghost">
              <Search />
            </Button>
            <div className="flex gap-x-2">
              <Button variant="secondary" asChild>
                <Link href="/login">login</Link>
              </Button>
              <Button asChild>
                <Link href="/join">join</Link>
              </Button>
            </div>
          </div>
        )}

        {/* 중간메뉴 */}
        <div className="absolute  h-full flex justify-center items-center gap-x-8 left-1/2 -translate-x-1/2 z-10">
          {menus.map((item) => (
            <NavLink
              key={item.title}
              url={item.url}
              FlyoutContent={item.subMenus}
            >
              <div className="flex flex-col h-full justify-center min-w-20">
                <h1 className="text-xl font-bold">{item.title}</h1>
                <p className=" text-muted-foreground text-sm uppercase">
                  {item.subTitle}
                </p>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}
