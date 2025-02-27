import {getMe} from "@/app/_actions/user/actions";
import TopBar from "@/app/_components/topBar/topBar";
import {redirect} from "next/navigation";
import React from "react";

export default async function Layout({
  children
}: {
  children: React.ReactNode
}) {
  const me = await getMe();

  if(!('nick' in me)) {
    redirect('/');
  }

  return (
    <div className="flex flex-col w-full h-full min-h-screen">
      <TopBar />

      <div className="w-full flex flex-col items-center">
        <div className="w-full max-w-ps px-4 ps:px-0 py-4">
          {children}
        </div>
      </div>
    </div>
  );
}
