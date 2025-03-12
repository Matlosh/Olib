'use client';

import { MeContext } from "@/app/_providers/providers";
import {Avatar, Tooltip} from "@heroui/react";
import Link from "next/link";
import { useContext } from "react";
import { HiMiniUser } from "react-icons/hi2";

export default function BarAvatar() {
  const meContext = useContext(MeContext);

  return (
    <Link href="/dashboard">
      <Tooltip
        content={`Hi, ${meContext !== null ? meContext?.nick : 'adventurer'}!`}
        placement="right">
        <Avatar
          showFallback
          fallback={<HiMiniUser className="text-3xl" />}
          className="cursor-pointer"
        />
      </Tooltip>
    </Link>
  );
}
