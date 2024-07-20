import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Social } from "./social";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

type Props = {
  title: string;
  description: string;
  redirectText: string;
  redirectHref: string;
  children: React.ReactNode;
};

function AuthCard({
  title,
  description,
  redirectText,
  redirectHref,
  children,
}: Props) {
  return (
    <Card className={"md:w-[450px] sm:w-auto"}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className={"space-x-1"}>
          <span>{description}</span>
          <Link className={"font-semibold underline"} href={redirectHref}>
            {redirectText}
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className={"flex-col gap-2"}>
        <Social />
        <div className={"text-center text-muted-foreground text-xs mx-5"}>
          <p className={"space-x-1"}>
            <span>By clicking continue, you agree to our</span>
            <Dialog>
              <DialogTrigger asChild>
                <Link className={"underline"} href={"/"}>
                  Terms of Service
                </Link>
              </DialogTrigger>
              <DialogContent>Terms of Service</DialogContent>
            </Dialog>
            <span>and</span>
            <Link className={"underline"} href={"/"}>
              Privacy Policy.
            </Link>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}

export { AuthCard };
