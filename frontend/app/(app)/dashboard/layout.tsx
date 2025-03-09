import {getUserShelves} from "@/app/_actions/shelves/actions";
import {getMe} from "@/app/_actions/user/actions";
import MenuBar from "@/app/_components/menuBar/menuBar";
import TopBar from "@/app/_components/topBar/topBar";
import {LibraryProvider} from "@/app/_providers/libraryProvider";
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

  const shelves = await getUserShelves();

  return (
    <div className="flex flex-row w-full h-full min-h-screen">
      <LibraryProvider shelves={!('message' in shelves) ? shelves : []}>
        <MenuBar />

        <div className="w-full flex flex-col items-center bg-amber-500/5">
          <div className="w-full p-8">
            <TopBar />
            {children}
          </div>
        </div>
      </LibraryProvider>
    </div>
  );
}
