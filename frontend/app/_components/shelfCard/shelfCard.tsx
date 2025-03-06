'use client';

import {useEffect} from "react";

type ShelfCardProps = {
  shelf: ShelfData
};

export default function ShelfCard({ shelf }: ShelfCardProps) {
  useEffect(() => {
    console.log(shelf);
  }, []);

  return (
    <div className="w-full h-[200px] flex flex-col justify-end">
      <div className="flex flex-col items-center perspective-500 shadow-[0px_20px_18px_-20px_rgba(0,0,0,0.71)]">
          <div className="h-20 rotate-x-66 w-[84.5%]">
            <div className="w-full h-full translate-y-[45px] bg-orange-950">

            </div>
          </div>

        <div className="w-full h-2 bg-orange-900 shadow-lg">

        </div>
      </div>
    </div>
  );
}
