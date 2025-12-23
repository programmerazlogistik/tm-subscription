"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import IconComponent from "@/components/IconComponent/IconComponent";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/Popover/Popover";

import { useTokenActions } from "@/store/AuthStore/tokenStore";
import { useUserActions } from "@/store/AuthStore/userStore";

const Navbar = ({ user = "John", toggleSidebar, sidebarOpen }) => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { clearToken } = useTokenActions();
  const { clearUser } = useUserActions();

  const handleLogout = () => {
    clearToken();
    clearUser();
    setIsDropdownOpen(false);
    router.replace("/login");
  };
  return (
    <div className="bg-primary flex h-[58px] w-full items-center justify-between px-7 text-white">
      <div className="flex">
        <button
          onClick={toggleSidebar}
          className="flex items-center justify-center rounded-md p-2 text-white transition-all duration-200 hover:bg-primary-800 focus:outline-none"
          aria-label="Toggle sidebar"
        >
          <IconComponent
            src="/icons/nav/hamburger.svg"
            alt="Toggle Menu"
            width={24}
            height={24}
          />
        </button>
      </div>

      {/* Icon links */}
      <div className="ml-auto flex items-center space-x-[14px]">
        <Link href="/home" className="flex items-center">
          <IconComponent
            src="/icons/nav/home.svg"
            alt="Home"
            width={20}
            height={20}
          />
        </Link>
        <Link href="/messages" className="flex items-center">
          <IconComponent
            src="/icons/nav/mail.svg"
            alt="Messages"
            width={20}
            height={20}
          />
        </Link>
        <Link href="/notifications" className="flex items-center pr-4">
          <IconComponent
            src="/icons/nav/notif.svg"
            alt="Notifications"
            width={24}
            height={24}
          />
        </Link>

        {/* User profile with dropdown */}
        <Popover open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
          <PopoverTrigger asChild>
            <div className="flex cursor-pointer items-center space-x-1">
              <div className="flex items-center">
                <IconComponent
                  src="/icons/nav/user.svg"
                  alt="User Profile"
                  width={24}
                  height={24}
                  color="white"
                />
                <span className="ml-2">{user}</span>
              </div>
              <IconComponent
                src="/icons/nav/chevron.svg"
                alt="Dropdown"
                width={24}
                height={24}
                color="white"
              />
            </div>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-48 p-0" sideOffset={8}>
            <div className="py-1">
              <button
                onClick={handleLogout}
                className="flex w-full items-center px-4 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-100"
              >
                <svg
                  className="mr-3 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Navbar;
