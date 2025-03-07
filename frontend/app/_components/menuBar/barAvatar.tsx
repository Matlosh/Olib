'use client';

import {Avatar} from "@heroui/react";
import Link from "next/link";
import { HiMiniUser } from "react-icons/hi2";

export default function BarAvatar() {
  return (
    <Link href="/dashboard">
      <Avatar
        showFallback
        fallback={<HiMiniUser className="text-3xl" />}
        className="cursor-pointer"
      />
    </Link>
  );
}
