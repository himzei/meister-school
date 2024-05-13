"use server";

import prisma from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

const checkEmailExists = async (email) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  return Boolean(user);
};

const formSchema = z.object({
  email: z
    .string()
    .email()
    .toLowerCase()
    .refine(checkEmailExists, "An account with this email does not exist."),
  password: z.string({
    required_error: "Password is required",
  }),
  // .min(PASSWORD_MIN_LENGTH),
  // .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export async function login(prevState, formData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = await formSchema.spa(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const user = await prisma.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
        name: true,
      },
    });

    const ok = await bcrypt.compare(result.data.password, user.password);

    if (ok) {
      // const session = await getSession();

      const session = await getIronSession(cookies(), {
        cookieName: "bio-meister",
        password: process.env.COOKIE_PASSWORD,
      });

      session.id = user.id;
      await session.save();

      if (user.name) {
        redirect("/");
      } else {
        redirect("/settings");
      }
    } else {
      return {
        fieldErrors: {
          password: ["잘못된 비밀번호 임니다!"],
          email: [],
        },
      };
    }
  }
}

export async function logOut() {
  const session = await getSession();
  await session.destroy();
  redirect("/");
}
