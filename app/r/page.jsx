import { Card } from "@/components/ui/card";
import Image from "next/image";
import Banner from "@/public/images/banner.png";
import HelloImage from "@/public/images/hero-image.png";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CreatePostCard } from "@/app/components/CreatePostCard";
import prisma from "@/lib/db";
import { PostCard } from "@/app//components/PostCard";
import { Suspense } from "react";
import SuspenseCard from "@/app/components/SuspenseCard";
import Pagination from "@/app/components/Pagination";
import { unstable_noStore as noStore } from "next/cache";

const SHOW_POST = 10;

async function getData(searchParams) {
  noStore();
  const [count, data] = await prisma.$transaction([
    prisma.post.count(),
    prisma.post.findMany({
      take: SHOW_POST,
      skip: searchParams ? (Number(searchParams) - 1) * SHOW_POST : 0,
      select: {
        title: true,
        createdAt: true,
        textContent: true,
        id: true,
        imageString: true,
        Comment: {
          select: {
            id: true,
          },
        },
        User: {
          select: {
            username: true,
          },
        },
        subName: true,
        Vote: {
          select: {
            userId: true,
            voteType: true,
            postId: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
  ]);

  return { data, count };
}

export default function RedditCommunity({ searchParams }) {
  return (
    <div className="custom-width flex gap-x-10 ">
      <div className="w-[70%] flex flex-col gap-y-5">
        <CreatePostCard />
        <Suspense fallback={<SuspenseCard />} key={searchParams.page}>
          <ShowItems searchParams={searchParams} />
        </Suspense>
      </div>
      <div className="w-[30%]">
        <Card>
          <Image src={Banner} alt="Banner" />
          <div className="p-2">
            <div className="flex items-center ">
              <Image
                src={HelloImage}
                alt="hello-image"
                className="w-10 h-16 -mt-6"
              />
              <h1 className="font-medium pl-2">마이스터고 토론방</h1>
            </div>
            <p className="text-muted-foreground text-sm pt-2">
              {" "}
              마이스터고의 토론방입니다. 나의 글을 작성하고 마이스터고 학생들의
              작품/의견을 업보트 및 다운보트 해주세요!
            </p>
            <Separator className="my-5" />

            <div className="flex flex-col gap-y-3">
              {/* <Button asChid variant="secondary">
                <Link href="/r/himzei/create">나의 글 생성하기</Link>
              </Button> */}
              <Button asChild>
                <Link href="/r/create">토론방 만들기</Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

async function ShowItems({ searchParams }) {
  const { count, data } = await getData(searchParams.page);
  return (
    <>
      {data.map((post) => (
        <PostCard
          key={post.id}
          id={post.id}
          imageString={post.imageString}
          jsonContent={post.textContent}
          subName={post.subName}
          title={post.title}
          username={post.User?.username}
          commentAmount={post.Comment.length}
          voteCount={post.Vote.reduce((acc, vote) => {
            if (vote.voteType === "UP") return acc + 1;
            if (vote.voteType === "DOWN") return acc - 1;

            return acc;
          }, 0)}
        />
      ))}

      <Pagination totalPages={Math.ceil(count / SHOW_POST)} />
    </>
  );
}
