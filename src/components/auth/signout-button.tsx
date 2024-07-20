"use client";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

function SignOutButton() {
  return (
    <Button variant={"outline"} onClick={async () => await signOut()}>
      Sign Out
    </Button>
  );
}

export { SignOutButton };
