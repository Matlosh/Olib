'use client';

import {logoutUser} from "@/app/_actions/user/actions";
import {addToast} from "@heroui/react";
import {useRouter} from "next/navigation";
import { ImExit } from "react-icons/im";

export default function LogoutIcon() {
  const router = useRouter();

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
    <ImExit
      className="text-3xl cursor-pointer"
      onClick={logout}
      />
  );
}
