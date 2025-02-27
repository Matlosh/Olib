'use client';

import BarAvatar from "./barAvatar";
import CreateBox from "./createBox";


export default function TopBar() {
  return (
    <div className="w-full h-[75px] shadow-lg bg-primary sticky top-0 text-white flex flex-col items-center justify-center">
      <div className="max-w-ps w-full flex flex-row px-4 ps:px-0 justify-between items-center">
        <BarAvatar />                
        <CreateBox />
      </div>
    </div>
  );
}
