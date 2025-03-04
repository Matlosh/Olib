'use client';

import BarAvatar from "./barAvatar";
import CreateBox from "./createBox";
import { IoMdSettings } from "react-icons/io";
import { IoLibrary } from "react-icons/io5";
import {Modal, ModalBody, ModalContent, Tooltip} from "@heroui/react";
import LogoutIcon from "./logoutIcon";
import {ReactNode, useState} from "react";
import ShelfForm from "../shelfForm/shelfForm";

export default function MenuBar() {
  const [showPopupBox, setShowPopupBox] = useState(false);
  const [popupContent, setPopupContent] = useState<ReactNode>(null);

  return (
    <div className="w-[75px] h-screen shadow-lg bg-primary sticky top-0 text-white flex flex-col items-center justify-center">
      <div className="max-w-ps w-full h-full flex flex-col py-8 justify-start items-center gap-8">
        <div>
          <BarAvatar />                
        </div>

        <div className="flex-1 flex flex-col items-center gap-4">
          <Tooltip content="Library" placement="right">
            <IoLibrary className="text-3xl cursor-pointer" />
          </Tooltip>

          <Tooltip content="Add new" placement="right">
            <div>
              <CreateBox
                setShowPopupBox={setShowPopupBox}
                setPopupContent={setPopupContent}
              />
            </div>
          </Tooltip>

          <div className="mt-auto flex flex-col gap-4">
            <Tooltip content="Account settings" placement="right">
              <IoMdSettings
                className="text-3xl cursor-pointer"
                onClick={_ => setShowPopupBox(true)}/>
            </Tooltip>

            <Tooltip
              color="danger"
              content="Log out"
              placement="right">
              <div>
                <LogoutIcon />
              </div>
            </Tooltip>
          </div>
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
