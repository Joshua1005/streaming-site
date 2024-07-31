import { Nav } from "@/components/ui/nav";
import { SearchBar } from "@/components/search-bar";
import { Link } from "@/components/ui/link";
import {
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
  Sheet,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { MountainIcon, Menu } from "lucide-react";
import { Header } from "@/components/ui/header";
import { headers } from "next/headers";
import { cn } from "@/lib/utils";
import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

async function AppHeader() {
  const header = headers();
  const pathname = header.get("x-current-path") || "/";
  const session = await auth();

  return (
    <Header>
      <section>
        <Link href={"/"} className={"flex items-center gap-2"}>
          <MountainIcon className={"h-6 w-6"} />
          <span className={"text-lg font-semibold"}>Acme Inc</span>
        </Link>
      </section>
      <SearchBar placeholder={"Search..."} />
      <Nav className={"hidden md:flex"}>
        <Link
          href={"/"}
          className={cn(pathname === "/" ? "font-bold text-primary" : "")}
        >
          Home
        </Link>
        {!session?.user ? (
          <>
            <Link
              href={"/signin"}
              className={cn(
                pathname === "/signin" ? "font-bold text-primary" : ""
              )}
            >
              Sign In
            </Link>
            <Link
              href={"/signup"}
              className={cn(
                "px-3 py-2 rounded-md border",
                pathname === "/signup" ? "font-bold text-primary" : ""
              )}
            >
              Sign Up
            </Link>
          </>
        ) : (
          <Avatar>
            <AvatarFallback>{session?.user?.name.charAt(0)}</AvatarFallback>
            <AvatarImage src={session?.user.image ?? ""} />
          </Avatar>
        )}
      </Nav>
      <Sheet>
        <SheetTrigger asChild className={"md:hidden flex"}>
          <Menu />
        </SheetTrigger>
        <SheetContent>
          <VisuallyHidden>
            <SheetTitle />
            <SheetDescription />
          </VisuallyHidden>
          <Nav className={"flex md:hidden flex-col"}>
            <Link
              href={"/"}
              className={cn(
                "justify-start",
                pathname === "/" ? "font-bold text-primary" : ""
              )}
            >
              Home
            </Link>
            {!session?.user ? (
              <>
                <Link
                  href={"/signin"}
                  className={cn(
                    pathname === "/signin" ? "font-bold text-primary" : ""
                  )}
                >
                  Sign In
                </Link>
                <Link
                  href={"/signup"}
                  className={cn(
                    "px-3 py-2 rounded-md border",
                    pathname === "/signup" ? "font-bold text-primary" : ""
                  )}
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <Avatar>
                <AvatarFallback>{session?.user?.name.charAt(0)}</AvatarFallback>
                <AvatarImage src={session?.user.image ?? ""} />
              </Avatar>
            )}
          </Nav>
        </SheetContent>
      </Sheet>
    </Header>
  );
}

export { AppHeader };
