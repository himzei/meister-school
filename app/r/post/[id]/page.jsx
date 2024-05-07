/* eslint-disable @next/next/no-img-element */
import { handleVote } from "@/app/actions";
import { CommentForm } from "@/app/components/CommentForm";
import { CopyLink } from "@/app/components/CopyLink";
import { RenderToJson } from "@/app/components/RenderToJson";
import { DownVote, UpVote } from "@/app/components/SubmitButton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/db";
import { formatToTimeAgo } from "@/lib/utils";
import { Calendar, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

async function getData(id) {
  noStore();
  const data = await prisma.post.findUnique({
    where: {
      id: id,
    },
    select: {
      createdAt: true,
      title: true,
      imageString: true,
      textContent: true,
      subName: true,
      id: true,
      Vote: {
        select: {
          voteType: true,
        },
      },
      Comment: {
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          text: true,
          User: {
            select: {
              avatar: true,
              username: true,
            },
          },
        },
      },
      Subreddit: {
        select: {
          name: true,
          createdAt: true,
          description: true,
        },
      },
      User: {
        select: {
          username: true,
        },
      },
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function PostPage({ params }) {
  const data = await getData(params.id);
  return (
    <div className="custom-width flex gap-x-10">
      <div className="w-[70%] flex flex-col gap-y-5">
        <Card className="p-2 flex">
          <div className="flex flex-col items-center gap-y-2 p-2 bg-muted">
            <form action={handleVote}>
              <input type="hidden" name="voteDirection" value="UP" />
              <input type="hidden" name="postId" value={data.id} />
              <UpVote />
            </form>
            {data.Vote.reduce((acc, vote) => {
              if (vote.voteType === "UP") return acc + 1;
              if (vote.voteType === "DOWN") return acc - 1;

              return acc;
            }, 0)}
            <form action={handleVote}>
              <input type="hidden" name="voteDirection" value="DOWN" />
              <input type="hidden" name="postId" value={data.id} />
              <DownVote />
            </form>
          </div>

          <div className="p-2 w-full">
            <p className="text-xs text-muted-foreground">
              작성자 u/{data.User?.username}
            </p>
            <h1 className="font-medium mt-1 text-lg">{data.title}</h1>

            {data.imageString && (
              <Image
                src={`${data.imageString}/public`}
                alt="User Image"
                width={500}
                height={400}
                className="w-full h-auto object-contain mt-2"
              />
            )}

            {data.textContent && <RenderToJson data={data.textContent} />}

            <div className="flex gap-x-5 items-center mt-3">
              <div className="flex items-center gap-x-1">
                <MessageCircle className="size-4 text-muted-foreground" />
                <p className="text-muted-foreground font-medium text-xs">
                  {data.Comment.length} 코멘트
                </p>
              </div>
              <CopyLink id={params.id} />
            </div>

            <CommentForm postId={params.id} />

            <Separator className="my-5" />

            <div className="flex flex-col gap-y-5">
              {data.Comment.map((item) => (
                <div key={item.id} className="flex flex-col">
                  <div className="flex items-center gap-x-3">
                    <img
                      src={
                        item.User?.avatar
                          ? item.User.avatar
                          : "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                      }
                      alt="Avatar image"
                      className="size-7 rounded-full"
                    />
                    <h3 className="text-sm font-medium">
                      {item.User?.username}
                    </h3>
                  </div>
                  <p className="ml-10 text-secondary-foreground text-sm tracking-tight">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <div className="w-[30%]">
        <Card>
          <div className="bg-muted p-4 font-semibold">토론방(Sub Reddit)</div>
          <div className="p-4">
            <div className="flex items-center gap-x-3">
              <Image
                src={`https://avatar.vercel.sh/${data?.subName}`}
                alt="image of subreddit"
                width={60}
                height={60}
                className="rounded-full size-16"
              />
              <Link href={`/r/${data?.subName}`} className="font-medium">
                r/{data?.subName}
              </Link>
            </div>

            <p className="text-sm text-secondary-foreground mt-2">
              {data?.Subreddit?.description}
            </p>

            <div className="flex items-center gap-x-1 mt-2 ">
              <Calendar className="size-4 text-muted-foreground" />
              <p className="text-muted-foreground font-medium text-sm">
                작성일: {formatToTimeAgo(data?.createdAt.toString())}
              </p>
            </div>

            <Separator className="my-5" />

            <Button asChild className="rounded-full w-full">
              <Link href={`/r/${data?.subName}/create`}>글 작성하기</Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
