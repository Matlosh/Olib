'use client';

import {Tooltip} from "@heroui/react";
import { TiStar } from "react-icons/ti";

type StarsProps = {
  value: number,
  maxValue: number,
  maxStars: number
};

export default function Stars({
  value,
  maxValue,
  maxStars
}: StarsProps) {
  return (
    <div className="w-fit">
      <Tooltip content={`${value} out of ${maxValue}`}>
        <div className="flex flex-row overflow-hidden" style={{maxWidth: `${(value * 100) / maxValue}%`}}>
          {Array.from(Array(maxStars).keys()).map(i => (
            <div key={i}>
              <TiStar className="text-yellow-500 text-lg" />
            </div>
          ))}
        </div>
      </Tooltip>
    </div>
  );
}
