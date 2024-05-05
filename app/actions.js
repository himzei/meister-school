"use server";

import prisma from "@/lib/db";
import getSession from "@/lib/session";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getUser() {
  const session = await getSession();

  if (session.id) {
    const user = await prisma.user.findUnique({
      where: {
        id: session.id,
      },
      select: {
        id: true,
        username: true,
        email: true,
        avatar: true,
      },
    });
    if (user) {
      return user;
    }
  }
  return;
}

export async function updateUserInfo(prevState, formData) {
  const user = await getUser();

  if (!user) {
    return redirect("/login");
  }

  const name = formData.get("name");
  const phone = formData.get("phone");

  try {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: name,
        phone: phone,
      },
    });
    return {
      status: "green",
      message: "사용저 정보가 성공적으로 업데이트 되었습니다!",
    };
  } catch (e) {
    throw e;
    // if (e instanceof Prisma.PrismaClientKnownRequestError) {
    //   if (e.code === "P2002") {
    //     return { message: "" };
    //   }
    // }
  }
}

export async function createCommunity(prevState, formData) {
  const user = await getUser();

  if (!user) {
    return redirect("/login");
  }

  try {
    const name = formData.get("name");

    const data = await prisma.subreddit.create({
      data: {
        name: name,
        userId: user.id,
      },
    });

    return redirect(`/r/${data.name}`);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return {
          message:
            "토론방 이름이 이미 사용중입니다! 다른 이름을 사용해 주세요!",
          status: "error",
        };
      }
    }

    throw e;
  }
}

export async function updateSubDescription(prevState, formData) {
  const user = await getUser();

  if (!user) {
    return redirect("/login");
  }

  try {
    const subName = formData.get("subName");
    const description = formData.get("description");

    await prisma.subreddit.update({
      where: {
        name: subName,
      },
      data: {
        description: description,
      },
    });

    return {
      status: "green",
      message: "Succesfully updated the description!",
    };
  } catch {
    return {
      status: "error",
      message: "Sorry something went wrong!",
    };
  }
}

export async function createPost({ jsonContent }, formData) {
  const user = await getUser();

  if (!user) {
    return redirect(`/login`);
  }
  console.log(jsonContent);

  const title = formData.get("title");
  const photoUrl = formData.get("photoUrl");
  const subName = formData.get("subName");

  const data = await prisma.post.create({
    data: {
      title: title,
      imageString: photoUrl,
      subName: subName,
      userId: user.id,
      textContent: jsonContent,
    },
  });

  return redirect(`/r/post/${data.id}`);
}

export async function getUploadUrl() {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ACCOUNT_ID}/images/v2/direct_upload`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CF_API_KEY}`,
      },
    }
  );
  const data = await response.json();
  return data;
}

export async function handleVote(formData) {
  const user = await getUser();

  if (!user) {
    return redirect("/login");
  }

  const postId = formData.get("postId");
  const voteDirection = formData.get("voteDirection");

  const vote = await prisma.vote.findFirst({
    where: {
      postId: postId,
      userId: user.id,
    },
  });

  if (vote) {
    if (vote.voteType === voteDirection) {
      await prisma.vote.delete({
        where: {
          id: vote.id,
        },
      });

      return revalidatePath("/r");
    } else {
      await prisma.vote.update({
        where: {
          id: vote.id,
        },
        data: {
          voteType: voteDirection,
        },
      });

      return revalidatePath("/r");
    }
  }

  await prisma.vote.create({
    data: {
      voteType: voteDirection,
      userId: user.id,
      postId: postId,
    },
  });

  return revalidatePath("/r");
}

export async function createComment(formData) {
  const user = await getUser();

  if (!user) return redirect("/login");

  const comment = formData.get("comment");
  const postId = formData.get("postId");

  const data = await prisma.comment.create({
    data: {
      text: comment,
      userId: user.id,
      postId: postId,
    },
  });

  revalidatePath(`/post/${postId}`);
}
