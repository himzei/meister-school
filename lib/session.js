"use server";

import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export default async function getSession() {
  return await getIronSession(cookies(), {
    cookieName: "bio-meister",
    password: process.env.COOKIE_PASSWORD,
  });
}
