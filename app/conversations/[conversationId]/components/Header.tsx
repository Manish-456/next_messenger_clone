"use client";
import { FullConversationType } from "@/app/Types";
import Avatar from "@/app/components/Avatar";
import useOtherUser from "@/app/hooks/useOtherUser";
import clsx from "clsx";
import Link from "next/link";
import { FC, useMemo, useState } from "react";
import { HiChevronLeft } from "react-icons/hi";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import ProfileDrawer from "./ProfileDrawer";
import AvatarGroup from "@/app/components/AvatarGroup";
import useActiveList from "@/app/hooks/useActiveList";

interface HeaderProps {
  conversation: FullConversationType;
}
const Header: FC<HeaderProps> = ({ conversation }) => {
  const { members } = useActiveList();
  const otherUsers = useOtherUser(conversation);
  const [openDrawer, setOpenDrawer] = useState(false);
  const isActive = members?.indexOf(otherUsers?.email!) !== -1;
  const statusText = useMemo(() => {
    if (conversation?.isGroup) {
      return `${conversation.users.length} members`;
    }
    return `${isActive ? "Online" : "Offline"}`;
  }, [conversation, isActive]);

  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={openDrawer}
        onClose={() => setOpenDrawer(false)}
      />
      <div
        className={clsx(`
      bg-white
      w-full
      flex
      border-b-[1px]
      sm:px-4
      py-3
      px-4
      lg:px-6
      justify-between
      shadow-sm
      `)}
      >
        <div className="flex gap-3 items-center">
          <Link
            href={`/conversations`}
            className="
          block
          lg:hidden text-sky-500 transition cursor-pointer"
          >
            <HiChevronLeft size={32} />
          </Link>
          {conversation?.isGroup ? (
            <AvatarGroup users={conversation.users} />
          ) : (
            <Avatar user={otherUsers} />
          )}
          <div className="flex flex-col">
            <div>{conversation.name || otherUsers.name}</div>
            <div className="text-sm font-light text-neutral-500">
              {statusText}
            </div>
          </div>
        </div>
        <HiEllipsisHorizontal
          size={32}
          onClick={() => {
            setOpenDrawer(true);
          }}
          className="text-sky-500 hover:text-sky-600 transition"
        />
      </div>
    </>
  );
};

export default Header;
