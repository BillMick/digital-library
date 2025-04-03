"use client";

import RagChat from "@/components/RagChat/RagChat";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import HeaderLogged from "@/components/Header/HeaderLogged";
import Header from "@/components/Header/Header";
import Header2 from "@/components/Header/Header2";
import {
  ShoppingBagIcon as ShoppingCartIcon,
  Cog8ToothIcon as CogIcon,
  ChatBubbleLeftEllipsisIcon as ChatIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { Popover, Transition } from "@headlessui/react";
import SwitchDarkMode2 from "@/components/SwitchDarkMode/SwitchDarkMode2";
import { useThemeMode } from "@/hooks/useThemeMode";

const SiteHeader = () => {
  let pathname = usePathname();
  useThemeMode();

  const [headerSelected, setHeaderSelected] = useState("Header 1");
  const [themeDir, setThemeDIr] = useState<"rtl" | "ltr">("ltr");
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    if (themeDir === "rtl") {
      document.querySelector("html")?.setAttribute("dir", "rtl");
    } else {
      document.querySelector("html")?.removeAttribute("dir");
    }
    return () => {
      document.querySelector("html")?.removeAttribute("dir");
    };
  }, [themeDir]);

  const renderControlSelections = () => {
    return (
      <div className="ControlSelections relative z-40 hidden md:block">
        <div className="fixed right-3 top-1/4 z-40 flex items-center">
          <Popover className="relative">
            {({ open }) => (
              <>
                <Popover.Button
                  className={`p-2.5 bg-white hover:bg-neutral-100 dark:bg-primary-6000 dark:hover:bg-primary-700 rounded-xl shadow-xl border border-neutral-200 dark:border-primary-6000 z-10 focus:outline-none ${
                    open ? " focus:ring-2 ring-primary-500" : ""
                  }`}
                >
                  <CogIcon className="w-8 h-8" />
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute right-0 z-10 mt-3 w-screen max-w-sm">
                    <div className="rounded-2xl bg-white dark:bg-neutral-950 overflow-hidden nc-custom-shadow-1">
                      <div className="relative p-6 space-y-3.5 xl:space-y-5">
                        <span className="text-xl font-semibold">Personnaliser votre affichage</span>
                        <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
                        <div className="flex space-x-2 xl:space-x-4 rtl:space-x-reverse">
                          <span className="text-sm font-medium">Dark mode</span>
                          <SwitchDarkMode2 />
                        </div>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        </div>
      </div>
    );
  };

  const headerComponent = useMemo(() => {
    let HeadComponent = HeaderLogged;
    if (pathname === "/home-2" || headerSelected === "Header 2") {
      HeadComponent = Header;
    }
    if (pathname === "/home-3" || headerSelected === "Header 3") {
      HeadComponent = Header2;
    }
    return <HeadComponent />;
  }, [pathname, headerSelected]);

  return (
    <>
      {/* Control Selection Panel (Dark Mode, Settings, etc.) */}
      {renderControlSelections()}

      {/* Header Component */}
      {headerComponent}

      {/* Floating Chat Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setShowChat(!showChat)}
          className="p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition"
        >
          <ChatIcon className="w-6 h-6" />
        </button>

        {/* Chat Window */}
        {showChat && (
          <div className="fixed bottom-16 right-4 w-80 bg-white shadow-lg rounded-lg border p-4">
            <div className="flex justify-between items-center border-b pb-2">
              <span className="font-semibold">RAG Agent</span>
              <button
                onClick={() => setShowChat(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
            <RagChat />
          </div>
        )}
      </div>
    </>
  );
};

export default SiteHeader;
