import prisma from "@/lib/db";
import { getUser } from "../actions";
import { redirect } from "next/navigation";
import { SettingsFrom } from "../components/SettingsForm";
import { unstable_noStore as noStore } from "next/cache";

async function getData(userId) {
  noStore();
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      username: true,
      name: true,
      avatar: true,
      phone: true,
    },
  });

  return data;
}

export default async function SettingsPage() {
  const user = await getUser();

  if (!user) {
    return redirect("login");
  }
  const data = await getData(user?.id);
  return (
    <div className="max-w-screen-xl mx-auto flex flex-col mt-8 px-4">
      <SettingsFrom
        name={data?.name}
        avatar={data?.avatar}
        phone={data?.phone}
      />
    </div>
  );
}
