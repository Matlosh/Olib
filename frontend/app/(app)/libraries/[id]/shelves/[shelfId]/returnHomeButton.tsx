'use client';

import { Button } from "@heroui/react";
import Link from "next/link";

type ReturnHomeButtonProps = {
  libraryId: string
};

export default function ReturnHomeButton({
  libraryId
}: ReturnHomeButtonProps) {
  return (
    <Button
      color="primary"
      as={Link}
      href={`/libraries/${libraryId}`}>
      Return to the library
    </Button>
  );
}