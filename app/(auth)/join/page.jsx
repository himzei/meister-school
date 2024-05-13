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
import { createAccount } from "./actions";
import { useFormState } from "react-dom";
import { SubmitButton } from "../../components/SubmitButton";

export default function JoinPage() {
  const [state, formAction] = useFormState(createAccount, null);

  return (
    <div className="max-w-screen-sm w-full mx-auto py-24">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>회원가입</CardTitle>
          <CardDescription>
            이미 회원이시라면{" "}
            <Link className="hover:text-primary hover:underline" href="/login">
              로그인
            </Link>{" "}
            이동
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="flex flex-col gap-y-4">
            <Input name="username" type="text" placeholder="아이디" required />
            {state?.fieldErrors.username && (
              <div className="text-sm text-red-500 px-2 -mt-1">
                {state?.fieldErrors.username}
              </div>
            )}
            <Input name="email" type="email" placeholder="이메일" required />
            {state?.fieldErrors.email && <div>{state?.fieldErrors.eamil}</div>}
            <Input
              name="password"
              type="password"
              placeholder="패스워드"
              required
            />
            {state?.fieldErrors.password && (
              <div className="text-sm text-red-500 px-2 -mt-1">
                {state?.fieldErrors.password}
              </div>
            )}
            <Input
              name="password2"
              type="password"
              placeholder="패스워드 확인"
              required
            />
            {state?.fieldErrors.password2 && (
              <div className="text-sm text-red-500 px-2 -mt-1">
                {state?.fieldErrors.password2}
              </div>
            )}
            <SubmitButton text="회원가입" />
          </form>
          <Separator className="my-4" />

          <Socials />
        </CardContent>
      </Card>
    </div>
  );
}
