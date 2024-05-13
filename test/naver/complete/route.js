import prisma from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

export async function GET(request) {
  const code = request.nextUrl.searchParams.get("code");
  if (!code) {
    return notFound();
  }

  let accessTokenURL = "https://nid.naver.com/oauth2.0/token";
  const accessTokenParams = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: process.env.NAVER_CLIENT_ID,
    client_secret: process.env.NAVER_CLIENT_SECRET,
    code: code,
    state: process.env.NAVER_STATE,
  }).toString();

  accessTokenURL = `${accessTokenURL}?${accessTokenParams}`;

  const accessTokenResponse = await fetch(accessTokenURL, {
    method: "POST",
  });

  const { access_token } = await accessTokenResponse.json();

  if (!access_token) {
    return new Response(null, {
      status: 400,
    });
  }

  const userProfileResponse = await fetch(
    "https://openapi.naver.com/v1/nid/me",
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  const {
    response: { id, profile_image, email, name },
  } = await userProfileResponse.json();

  const user = await prisma.user.findUnique({
    where: {
      naverId: id.toString(),
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
      username: `naver_${id}`,
      naverId: id.toString(),
      avatar: profile_image,
      email: email,
      name: name,
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
