'use client';

import {Avatar} from "@heroui/react";
import { HiMiniUser } from "react-icons/hi2";

export default function BarAvatar() {
  return (
    <Avatar
      showFallback
      fallback={<HiMiniUser className="text-3xl" />}
      className="cursor-pointer"
    />
  );
}
