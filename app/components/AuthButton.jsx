import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import getSession from "@/lib/session";
import { notFound } from "next/navigation";
import Link from "next/link";

async function getUser() {
  const session = await getSession();

  if (session.id) {
    const user = await prisma.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound();
}

export function AuthButton() {
  const user = getUser();

  return (
    <div className="*:uppercase flex items-center">
      <Button variant="ghost">
        <Search />
      </Button>
      <Button variant="ghost" asChild>
        <Link href="/login">login</Link>
      </Button>
      <Button variant="ghost" asChild>
        <Link href="/join">join</Link>
      </Button>
    </div>
  );
}
