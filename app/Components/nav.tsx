import React from "react";
import { ModeToggle } from "./theme-toggle";
import Image from "next/image";
import LogoRB from "@/public/RBlogo.png";
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
            className="w-18 rounded-full"
            src={LogoRB}
            alt="Logo Renoboard"
          />
        </Link>
        <h1 className="text-2xl uppercase font-luckiest-guy">RenoBoard</h1>
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
      <DropdownMenuContent className="flex flex-col w-full justify-between items-stretch gap-2 mx-auto">
        <DropdownMenuItem asChild>
          <Button variant="outline" className="mx-2 mb-1 flex justify-center">
            <Link
              href="/page/dashboard"
              className="flex items-center justify-center gap-2  w-full"
            >
              <LayoutDashboardIcon />
              <span>Tableau de bord</span>
            </Link>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Button variant="outline" className="mx-2 flex justify-center">
            <Link
              href="/auth"
              className="flex items-center justify-center gap-2 w-full"
            >
              <User />
              <span>Profil</span>
            </Link>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <form className="w-full flex flex-1 m-0 p-0">
            <Button
              variant="outline"
              className="w-full flex flex-1 justify-center"
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
