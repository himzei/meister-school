"use client";

import { Button } from "@/components/ui/button";
import { menus } from "@/lib/menus";
import { useDetectClose } from "@/lib/useDetectClose";
import { ArrowDown, ArrowRight, HomeIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LocalMenus() {
  const pathname = usePathname();
  const firstFilters = menus.find((item) => {
    return (
      item.url === pathname ||
      (item.subMenus &&
        item.subMenus.some((subItem) => subItem.url === pathname))
    );
  });
  const secondFilters = firstFilters?.subMenus?.filter((item) => item);
  let secondTitleItem = secondFilters.find((item) => item.url === pathname);

  let firstTitle = firstFilters.title;
  const secondTitle = secondTitleItem.title;

  const [firstIsOpen, firstRef, firstHandler] = useDetectClose(false);
  const [secondIsOpen, secondRef, secondHandler] = useDetectClose(false);

  return (
    <div className="w-full bg-primary h-16 flex justify-center">
      <div className="max-w-screen-xl text-white w-full flex items-center">
        <div className="flex px-4 items-center border-r-[1px] border-red-400 h-full">
          <Link href="/">
            <HomeIcon size={20} />
          </Link>
        </div>

        {/* text */}
        <div
          onClick={firstHandler}
          ref={firstRef}
          className={`relative transition-all cursor-pointer flex px-6 items-center w-52 justify-between border-r-[1px] border-red-400 h-full ${
            firstIsOpen && "bg-red-900"
          }`}
        >
          <div className={`w-full flex items-center justify-between`}>
            <h2>{firstTitle}</h2>
            <div className="transition-all bg-white  rounded-full">
              {firstIsOpen ? (
                <ArrowDown size="18" className="text-primary" />
              ) : (
                <ArrowRight size="18" className="text-primary" />
              )}
            </div>
          </div>
          <div
            className={`absolute transition-all top-[64px] left-0 w-[207px] bg-white border border-t-0 border-neutral-300 ${
              firstIsOpen ? "opacity-100 block" : "opacity-0 hidden"
            }`}
          >
            <div className="w-full flex flex-col text-neutral-700 px-6 py-6 gap-y-4">
              {menus.map((item) => (
                <Link key={item.title} href={item.url}>
                  <span
                    className="py-1 px-0.5 hover:border-b
										hover:text-red-800 hover:border-red-800"
                  >
                    {item.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* second  */}
        <div
          onClick={secondHandler}
          ref={secondRef}
          className={`relative transition-all cursor-pointer flex px-6 items-center w-52 justify-between border-r-[1px] border-red-400 h-full ${
            secondIsOpen && "bg-red-900"
          }`}
        >
          <div className={`w-full flex items-center justify-between`}>
            <p>{secondTitle}</p>
            <div className="transition-all bg-white  rounded-full">
              {secondIsOpen ? (
                <ArrowDown size="18" className="text-primary" />
              ) : (
                <ArrowRight size="18" className="text-primary" />
              )}
            </div>
          </div>
          <div
            className={`absolute transition-all top-[64px] left-0 w-[207px] bg-white border border-t-0 border-neutral-300 ${
              secondIsOpen
                ? "opacity-100 block transition-all"
                : "hidden opacity-0"
            }`}
          >
            <div className="w-full flex flex-col text-neutral-700 px-6 py-6 gap-y-4">
              {secondFilters.map((item) => (
                <Link key={item.title} href={item.url}>
                  <span
                    className="py-1 px-0.5 hover:border-b
										hover:text-red-800 hover:border-red-800"
                  >
                    {item.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
