import prisma from "@/lib/db";
import getSession from "@/lib/session";
import { Prisma } from "@prisma/client";
import { notFound, redirect } from "next/navigation";

export async function GET(request) {
  try {
    const code = request.nextUrl.searchParams.get("code");
    if (!code) {
      return notFound();
    }

    let accessTokenURL = `https://oauth2.googleapis.com/token`;
    const accessTokenParams = new URLSearchParams({
      code: code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      grant_type: "authorization_code",
    }).toString();

    accessTokenURL = `${accessTokenURL}?${accessTokenParams}`;

    const accessTokenResponse = await fetch(accessTokenURL, {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    });

    const { access_token } = await accessTokenResponse.json();

    if (!access_token) {
      return new Response(null, {
        status: 4000,
      });
    }

    const userProfileResponse = await fetch(
      `https://www.googleapis.com/oauth2/v2/userinfo`,
      {
        headers: {
          authorization: `Bearer ${access_token}`,
        },
      }
    );

    const { id, email, picture } = await userProfileResponse.json();

    const user = await prisma.user.findUnique({
      where: {
        googleId: id.toString(),
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
        username: `google_${id}`,
        googleId: id.toString(),
        avatar: picture,
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
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return { message: "" };
      }
    }
  }
}
