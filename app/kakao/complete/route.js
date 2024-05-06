import prisma from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(request) {
  const code = request.nextUrl.searchParams.get("code");

  if (!code) {
    return notFound();
  }

  const accessTokenURL = "https://kauth.kakao.com/oauth/token";
  const accessTokenData = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: process.env.KAKAO_CLIENT_ID,
    redirect_uri: process.env.KAKAO_REDIRECT_URI,
    code: code,
  }).toString();

  const accessTokenResponse = await fetch(
    `${accessTokenURL}?${accessTokenData}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    }
  );
  const { access_token } = await accessTokenResponse.json();

  if (access_token) {
    const userRequest = await fetch("https://kapi.kakao.com/v2/user/me", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${access_token}`,
        property_keys: ["kakao_account.email"],
      },
    });

    const userData = await userRequest.json();

    const {
      id,
      kakao_account: {
        profile: { nickname, thumbnail_image_url },
        email,
      },
    } = userData;

    const user = await prisma.user.findUnique({
      where: {
        kakaoId: id.toString(),
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
        username: id.toString(),
        kakaoId: id.toString(),
        avatar: thumbnail_image_url,
        name: nickname,
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
}
