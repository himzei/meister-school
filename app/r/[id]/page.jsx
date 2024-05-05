import { getUser } from "@/app/actions";
import { CreatePostCard } from "@/app/components/CreatePostCard";
import Pagination from "@/app/components/Pagination";
import { PostCard } from "@/app/components/PostCard";
import { SubDescriptionForm } from "@/app/components/SubDescriptionForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/db";
import { formatToTimeAgo } from "@/lib/utils";
import { Calendar, FileQuestion } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";

const SHOW_POST = 10;

async function getData(name, searchParams) {
  noStore();
  const [count, data] = await prisma.$transaction([
    prisma.post.count({
      where: {
        subName: name,
      },
    }),

    prisma.subreddit.findUnique({
      where: {
        name: name,
      },

      select: {
        name: true,
        createdAt: true,
        description: true,
        userId: true,
        posts: {
          take: SHOW_POST,
          skip: searchParams ? (Number(searchParams) - 1) * SHOW_POST : 0,
          select: {
            Comment: {
              select: {
                id: true,
              },
            },
            title: true,
            imageString: true,
            id: true,
            textContent: true,
            Vote: {
              select: {
                userId: true,
                voteType: true,
              },
            },
            User: {
              select: {
                username: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    }),
  ]);

  return { data, count };
}

export default async function SubredditRoute({ params, searchParams }) {
  console.log(searchParams);
  const { data, count } = await getData(params.id, searchParams.page);
  const user = await getUser();

  return (
    <div className="custom-width flex gap-x-10">
      <div className="w-[70%] flex flex-col gap-y-5">
        <CreatePostCard />

        {data?.posts.length === 0 ? (
          <div className="flex min-h-[400px] justify-center flex-col items-center rounded-md border border-dashed p-8 text-center">
            <div className="flex size-20 items-center justify-center rounded-full bg-primary/10">
              <FileQuestion className="size-10 text-primary" />
            </div>
            <h2 className="mt-6 text-xl font-semibold">
              이 토론방에 글이 없어요!
            </h2>
          </div>
        ) : (
          <>
            {data.posts?.map((post) => (
              <PostCard
                key={post.id}
                id={post.id}
                imageString={post.imageString}
                subName={data.name}
                title={post.title}
                username={post.User?.username}
                jsonContent={post.textContent}
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
        )}
      </div>
      <div className="w-[30%]">
        <Card>
          <div className="bg-muted p-4 font-semibold">토론방(Sub Reddit)</div>
          <div className="p-4">
            <div className="flex items-center gap-x-3">
              <Image
                src={`https://avatar.vercel.sh/${data?.name}`}
                alt="image of subreddit"
                width={60}
                height={60}
                className="rounded-full size-16"
              />
              <Link href={`/r/${data?.name}`} className="font-medium">
                r/{data?.name}
              </Link>
            </div>

            {user?.id === data?.userId ? (
              <SubDescriptionForm
                description={data?.description}
                subName={params.id}
              />
            ) : (
              <p className="text-sm text-secondary-foreground mt-2">
                {data?.description}
              </p>
            )}

            <div className="flex items-center gap-x-1 mt-2 ">
              <Calendar className="size-4 text-muted-foreground" />
              <p className="text-muted-foreground font-medium text-sm">
                Cretaed: {formatToTimeAgo(data?.createdAt.toString())}
              </p>
            </div>

            <Separator className="my-5" />

            <Button asChild className="rounded-full w-full">
              <Link href={user?.id ? `/r/${data?.name}/create` : "/login"}>
                글 작성하기
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
