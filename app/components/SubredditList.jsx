import prisma from "@/lib/db";
import Link from "next/link";

async function getData() {
  const data = await prisma.subreddit.findMany({
    select: {
      name: true,
    },
  });

  return data;
}

export async function SubredditList() {
  const data = await getData();
  return (
    <div className="flex flex-wrap gap-1.5 px-1">
      {data?.map((item, i) => (
        <Link href={`/r/${item.name}`} key={i}>
          <span className="border border-muted-foreground text-muted-foreground px-2 py-0.5 rounded-full cursor-pointer hover:bg-primary hover:text-white duration-300 hover:border-white">
            r/{item.name}
          </span>
        </Link>
      ))}
    </div>
  );
}
