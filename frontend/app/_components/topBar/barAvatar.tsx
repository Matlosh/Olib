'use client';

import {logoutUser} from "@/app/_actions/user/actions";
import {MeContext} from "@/app/providers";
import {Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, User, addToast} from "@heroui/react";
import {useRouter} from "next/navigation";
import {useContext} from "react";
import { HiMiniUser } from "react-icons/hi2";
import { ImExit } from "react-icons/im";
import { IoMdSettings } from "react-icons/io";
import { IoLibrary } from "react-icons/io5";

export default function BarAvatar() {
  const router = useRouter();
  const me = useContext(MeContext);

  const logout = () => {
    (async () => {
      const json = await logoutUser();

      if(json.success) {
        router.push('/');
      } else {
        addToast({
          title: 'Logging out failed.',
          description: 'Please try again.',
          color: 'danger'
        });
      }
    })();
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <User
          avatarProps={{
            showFallback: true,
            fallback: <HiMiniUser className="text-3xl" />,
            className: "cursor-pointer"
          }}
          name={me?.nick}
        />
      </DropdownTrigger>

      <DropdownMenu>
        <DropdownItem
          key="library"
          startContent={<IoLibrary />}>
          <p>Library</p>
        </DropdownItem>

        <DropdownItem
          key="settings"
          startContent={<IoMdSettings />}>
          <p>Settings</p>
        </DropdownItem>

        <DropdownItem
          key="log-out"
          color="danger"
          startContent={<ImExit />}
          className="text-danger"
          onPress={logout}>
          <p>Log out</p>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
