import React from "react";
import { ModeToggle } from "./theme-toggle";
import Image from "next/image";
import LogoRB from "@/public/LogoRb2.png";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutDashboardIcon, LogOut, User } from "lucide-react";
import { getUser } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default function Nav() {
  return (
    <nav className="m-5 lg:mx-15 h-[80px] flex items-center justify-between rounded-2xl px-5 border-4 border-gray-950/40 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 shadow-2xl">
      <div className="flex items-center gap-5">
        <Link href="/">
          <Image
            className="w-18 border rounded-full border-blue-200 bg-black"
            src={LogoRB}
            alt="Logo Renoboard"
          />
        </Link>
        <h1 className="text-2xl uppercase font-bold">RenoBoard</h1>
      </div>
      <div className="flex gap-4">
        <AuthButton />
        <ModeToggle />
      </div>
    </nav>
  );
}

export const AuthButton = async () => {
  const user = await getUser();
  if (!user) {
    return (
      <Button variant="outline">
        <Link href="/auth/signin">Sign In</Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <span>
          <p className="border-2 border-blue-800 py-1 px-2 rounded-md font-semibold bg-blue-800 hover:bg-blue-950">
            {user.name}
          </p>
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-2">
        <DropdownMenuItem asChild>
          <Button variant="outline" className="mx-2">
            <Link
              href="/page/dashboard"
              className="flex items-center justify-center gap-2"
            >
              <LayoutDashboardIcon />
              <span>Tableau de bord</span>
            </Link>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Button variant="outline" className="mx-2">
            <Link
              href="/auth"
              className="flex items-center justify-center gap-2"
            >
              <User />
              <span>Profil</span>
            </Link>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex justify-center">
          <form>
            <Button
              variant="outline"
              formAction={async () => {
                "use server";
                await auth.api.signOut({
                  headers: await headers(),
                });
                redirect("/");
              }}
            >
              <LogOut />
              Déconnexion
            </Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
