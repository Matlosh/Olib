'use client';

import BarAvatar from "./barAvatar";
import CreateBox from "./createBox";
import { IoMdSettings } from "react-icons/io";
import { IoLibrary } from "react-icons/io5";
import {Modal, ModalBody, ModalContent, Tooltip} from "@heroui/react";
import LogoutIcon from "./logoutIcon";
import {ReactNode, useEffect, useState} from "react";
import Link from "next/link";
import { getUserLibrary } from "@/app/_actions/libraries/actions";
import SettingsForm from "../settingsForm/settingsForm";
import { BsBarChartFill } from "react-icons/bs";

export default function MenuBar() {
  const [showPopupBox, setShowPopupBox] = useState(false);
  const [popupContent, setPopupContent] = useState<ReactNode>(null);
  const [library, setLibrary] = useState<LibraryData | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const libraryData = await getUserLibrary();

        if(!('message' in libraryData)) {
          setLibrary(libraryData);
        }
      } catch(err) {}
    })();
  }, []);

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

          <Tooltip content="Stats" placement="right">
            <Link href="/dashboard/stats">
              <div className="flex flex-col items-center gap-1">
                <BsBarChartFill className="text-2xl md:text-3xl cursor-pointer" />
                <p className="text-sm block md:hidden">Stats</p>
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
            <div className="flex flex-col items-center gap-1 mt-0 md:mt-auto"
              onClick={() => {
                if(library !== null) {
                  setPopupContent(<SettingsForm library={library} setLibrary={setLibrary} />);
                  setShowPopupBox(true);
                }
              }}>
              <IoMdSettings
                className="text-2xl md:text-3xl cursor-pointer" />
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
        onClose={() => setShowPopupBox(false)}
        placement="center">
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
