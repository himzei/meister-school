"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Socials from "@/app/components/Socials";
import { SubmitButton } from "../../components/SubmitButton";
import { useFormState } from "react-dom";
import { login } from "./actions";

export default function Login() {
  const [state, formAction] = useFormState(login, null);
  return (
    <div className="max-w-screen-sm w-full mx-auto pt-24">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>로그인</CardTitle>
          <CardDescription>
            아직 회원이 아니라면{" "}
            <Link className="hover:text-primary hover:underline" href="/join">
              회원가입
            </Link>{" "}
            이동
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="flex flex-col gap-y-4">
            <Input name="email" type="email" placeholder="이메일" required />
            <Input
              name="password"
              type="password"
              placeholder="패스워드"
              required
            />
            <SubmitButton text="로그인" />
          </form>
          <Separator className="my-4" />

          <Socials />
        </CardContent>
      </Card>
    </div>
  );
}
