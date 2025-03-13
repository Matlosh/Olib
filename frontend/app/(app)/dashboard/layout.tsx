import {getUserShelves} from "@/app/_actions/shelves/actions";
import {getMe} from "@/app/_actions/user/actions";
import MenuBar from "@/app/_components/menuBar/menuBar";
import TopBar from "@/app/_components/topBar/topBar";
import {LibraryProvider} from "@/app/_providers/libraryProvider";
import MeProvider from "@/app/_providers/meProvider";
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
      <MeProvider me={me}>
        <LibraryProvider shelves={!('message' in shelves) ? shelves : []}>
          <MenuBar />

          <div className="w-full flex flex-col items-center">
            <div className="w-full px-8 pt-8 pb-[calc(2rem+75px)] md:p-8 flex flex-col gap-8">
              <TopBar />
              {children}
            </div>
          </div>
        </LibraryProvider>
      </MeProvider>
    </div>
  );
}
