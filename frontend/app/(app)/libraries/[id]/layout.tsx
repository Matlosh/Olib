import { getPublicLibrary } from "@/app/_utils/cacheFunctions";
import React from "react";

type LayoutProps = {
  children: React.ReactNode,
  params: Promise<{ id: string }>
};

export default async function Layout({
  children,
  params
}: LayoutProps) {
  const { id } = await params;
  const publicLibrary = await getPublicLibrary(Number(id));
  
  return (
    <div className="w-full flex flex-col items-center justify-center mb-auto">
      {!('message' in publicLibrary) ?
        <div className="w-full max-w-[1600px] px-4 ps:px-0 flex flex-col items-center justify-center gap-4 mb-auto py-8">
          <h1 className="text-2xl font-bold">{publicLibrary.ownerName}'s library</h1>
          {children}
        </div> 
        :
        <div>
          <h1 className="text-xl font-bold">Library not found.</h1>
        </div>
      }
    </div>
  )
}