"use client";

import React from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

function Social() {
  return (
    <article className={"w-full"}>
      <section className={"pb-4 w-full"}>
        <Separator className={"flex justify-center items-center"}>
          <span
            className={
              "text-xs text-muted-foreground bg-primary-foreground text-center -translate-y-0.5"
            }
          >
            or continue with
          </span>
        </Separator>
      </section>
      <section className={"grid grid-cols-2 gap-2"}>
        <Button
          onClick={async () => await signIn("google")}
          variant={"outline"}
          className={"gap-2"}
        >
          <FcGoogle />
          <span>Google</span>
        </Button>
        <Button variant={"outline"} className={"gap-2"}>
          <FaFacebook color={"blue"} />
          <span>Facebook</span>
        </Button>
      </section>
    </article>
  );
}

export { Social };
