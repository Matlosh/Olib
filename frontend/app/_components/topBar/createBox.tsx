'use client';

import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@heroui/react";
import { HiMiniPlusCircle } from "react-icons/hi2";
import {IoBook, IoLibrary} from "react-icons/io5";

export default function CreateBox() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <HiMiniPlusCircle className="text-4xl cursor-pointer" />
      </DropdownTrigger>

      <DropdownMenu>
        <DropdownItem
          key="add-shelf"
          startContent={<IoLibrary />}>
          <p>Add a shelf</p>
        </DropdownItem>

        <DropdownItem
          key="add-book"
          startContent={<IoBook />}>
          <p>Add a book</p>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
