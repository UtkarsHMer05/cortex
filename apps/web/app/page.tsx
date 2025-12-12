"use client";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { Button } from "@workspace/ui/components/button";
export default function Page() {
  const users = useQuery(api.users.getMany);
  const addUser = useMutation(api.users.add);
  return (
    <>
      <AuthLoading>
        <div className="flex flex-col items-center justify-center min-h-svh">
          <p>Loading...</p>
        </div>
      </AuthLoading>
      <Authenticated>
        <div className="flex flex-col items-center justify-center min-h-svh">
          <Button onClick={() => addUser()}>Add</Button>
          <p>Apps/web</p>
          <UserButton />
          <div className="max-w-sm w-full mx-auto">
            {JSON.stringify(users, null, 2)}
          </div>
        </div>
      </Authenticated>
      <Unauthenticated>
        <div className="flex flex-col items-center justify-center min-h-svh">
          <p>Must be Signed In...!!!</p>
          <SignInButton mode="modal">
            <Button>Sign In!</Button>
          </SignInButton>
        </div>
      </Unauthenticated>
    </>
  )
}
