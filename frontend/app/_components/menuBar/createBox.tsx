'use client';

import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@heroui/react";
import {ReactNode} from "react";
import { HiMiniPlusCircle, HiMiniPlus } from "react-icons/hi2";
import {IoBook, IoLibrary} from "react-icons/io5";
import ShelfForm from "../shelfForm/shelfForm";
import BookForm from "../bookForm/bookForm";

type CreateBoxProps = {
  setShowPopupBox: (show: boolean) => void,
  setPopupContent: (content: ReactNode) => void
};

export default function CreateBox({
  setPopupContent,
  setShowPopupBox
}: CreateBoxProps) {
  return (
    <div>
      <Dropdown>
        <DropdownTrigger>
          <HiMiniPlus className="text-2xl md:text-4xl cursor-pointer" />
        </DropdownTrigger>

        <DropdownMenu>
          <DropdownItem
            key="add-shelf"
            startContent={<IoLibrary />}
            onPress={() => {
              setShowPopupBox(true);
              setPopupContent(<ShelfForm />);
            }}>
            <p>Add a shelf</p>
          </DropdownItem>

          <DropdownItem
            key="add-book"
            startContent={<IoBook />}
            onPress={() => {
              setShowPopupBox(true);
              setPopupContent(<BookForm />);
            }}>
            <p>Add a book</p>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
