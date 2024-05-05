import Link from "next/link";

export default function Dropdown({ subMenus, dropdown }) {
  return (
    <div
      className={`${
        dropdown ? "block" : "hidden"
      } absolute top-8 py-6 w-36 -translate-x-4 transition-all duration-400 `}
    >
      <div className="flex flex-col space-y-2 shadow-md border px-2 py-4 bg-neutral-50 border-neutral-300 w-full">
        {subMenus.map(({ url, title }, index) => (
          // 에러 나는 부분
          // 추후 수정
          // a 태그 에러
          <Link href={url} key={index}>
            <div className="hover:bg-red-700 hover:text-white px-1 py-1 rounded-sm">
              {title}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
