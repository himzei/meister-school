import prisma from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";

export async function GET(request) {
  // step 2
  const code = request.nextUrl.searchParams.get("code");

  if (!code) {
    return notFound();
  }

  let accessTokenURL = "https://github.com/login/oauth/access_token";
  const accessTokenParams = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code,
  }).toString();

  accessTokenURL = `${accessTokenURL}?${accessTokenParams}`;

  const accessTokenResponse = await fetch(accessTokenURL, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  });
  const { error, access_token } = await accessTokenResponse.json();

  if (error) {
    return new Response(null, {
      status: 400,
    });
  }

  // step 3
  const userProfileResponse = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    cache: "no-cache",
  });

  const { id, avatar_url, login, email } = await userProfileResponse.json();

  const user = await prisma.user.findUnique({
    where: {
      githubId: id.toString(),
    },
    select: {
      id: true,
    },
  });

  if (user) {
    const session = await getSession();
    session.id = user.id;
    await session.save();
    return redirect("/settings");
  }

  const newUser = await prisma.user.create({
    data: {
      username: `${login}_github`,
      githubId: id.toString(),
      avatar: avatar_url,
      email: email,
    },
    select: {
      id: true,
    },
  });
  const session = await getSession();
  session.id = newUser.id;
  await session.save();
  return redirect("/settings");
}
