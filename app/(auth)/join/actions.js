"use server";

import prisma from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import getSession from "@/lib/session";

// 비밀번호 체크
const checkPasswords = ({ password, password2 }) => password === password2;

// 아이디 중복 체크
const checkUniqueUsername = async (username) => {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });

  return !Boolean(user);
};

// 이메일 중복 체크
const checkUniqueEmail = async (email) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  return !Boolean(user);
};

// 인풋박스 유효성 검사
const formSchema = z
  .object({
    username: z
      .string()
      .toLowerCase()
      .trim()
      .refine(checkUniqueUsername, "입력하신 아이디는 이미 사용중입니다!"),
    email: z
      .string()
      .email()
      .toLowerCase()
      .refine(checkUniqueEmail, "입력하신 이메일은 이미 사용중입니다!"),
    password: z.string().regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    password2: z.string(),
  })
  .refine(checkPasswords, {
    message: "패스워드와 패스워드 확인은 같아야 합니다!",
    path: ["password2"],
  });

export async function createAccount(prevState, formData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    password2: formData.get("password2"),
  };

  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);

    const user = await prisma.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });

    // (로그인) => 쿠키사용;

    const session = await getSession();
    session.id = user.id;
    await session.save();

    redirect("/settings");
  }
}
