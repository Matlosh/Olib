'use client';

import BarAvatar from "./barAvatar";
import CreateBox from "./createBox";
import { IoMdSettings } from "react-icons/io";
import { IoLibrary } from "react-icons/io5";
import {Modal, ModalBody, ModalContent, Tooltip} from "@heroui/react";
import LogoutIcon from "./logoutIcon";
import {ReactNode, useState} from "react";
import Link from "next/link";

export default function MenuBar() {
  const [showPopupBox, setShowPopupBox] = useState(false);
  const [popupContent, setPopupContent] = useState<ReactNode>(null);

  return (
    <div className="w-full md:w-[75px] h-[75px] md:h-screen shadow-lg bg-primary fixed md:sticky bottom-0 md:top-0 text-white flex flex-col items-center justify-center z-50">
      <div className="max-w-ps w-full h-full flex flex-row md:flex-col px-4 md:px-0 py-0 md:py-8 justify-start items-center gap-8">
        <div className="hidden md:block">
          <BarAvatar />                
        </div>

        <div className="flex-1 flex flex-row md:flex-col items-center justify-between md:justify-start gap-4">
          <Tooltip content="Library" placement="right">
            <Link href="/dashboard">
              <div className="flex flex-col items-center gap-1">
                <IoLibrary className="text-2xl md:text-3xl cursor-pointer" />
                <p className="text-sm block md:hidden">Library</p>
              </div>
            </Link>
          </Tooltip>

          <Tooltip content="Add new" placement="right">
            <div className="flex flex-col items-center gap-1">
              <CreateBox
                setShowPopupBox={setShowPopupBox}
                setPopupContent={setPopupContent}
              />
              <p className="text-sm block md:hidden">Add</p>
            </div>
          </Tooltip>

          <Tooltip
            content="Account settings"
            placement="right">
            <div className="flex flex-col items-center gap-1 mt-0 md:mt-auto">
              <IoMdSettings
                className="text-2xl md:text-3xl cursor-pointer"
                onClick={_ => setShowPopupBox(true)}/>
              <p className="text-sm block md:hidden">Settings</p>
            </div>
          </Tooltip>

          <Tooltip
            color="danger"
            content="Log out"
            placement="right">
            <div className="flex flex-col items-center gap-1">
              <LogoutIcon />
              <p className="text-sm block md:hidden">Log out</p>
            </div>
          </Tooltip>
        </div>
      </div>

      <Modal
        isOpen={showPopupBox}
        size="xl"
        onClose={() => setShowPopupBox(false)}>
        <ModalContent>
          {(onClose) => (
            <ModalBody>
              {popupContent}
            </ModalBody> 
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
