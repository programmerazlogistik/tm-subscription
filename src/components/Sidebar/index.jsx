"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

import GuardedLink from "../GuardedLink";
import IconComponent from "../IconComponent/IconComponent";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Master Pricing",
      icon: "/icons/Harga.svg",
      href: "/master-pricing",
      children: [
        {
          name: "Master Rute Pricing",
          href: "/master-pricing/master-rute-pricing",
        },
        {
          name: "Master Tipe Pricing",
          href: "/master-pricing/master-tipe-pricing",
        },
        {
          name: "Master Rumus & Variabel",
          href: "/master-pricing/master-rumus-variabel",
        },
        {
          name: "Setting Nilai Variabel",
          href: "/master-pricing/setting-nilai-variabel",
        },
        {
          name: "Setting Tarif Minimal",
          href: "/master-pricing/setting-tarif-minimal",
        },
        {
          name: "Setting Rumus Pricing",
          href: "/master-pricing/setting-rumus-pricing",
        },
        {
          name: "Setting Default Pricing",
          href: "/master-pricing/setting-default-pricing",
        },
        {
          name: "Setting Margin",
          href: "/master-pricing/setting-margin",
        }
      ],
    },
    {
      name: "Master Voucher",
      icon: "/icons/voucher.svg",
      href: "/master-voucher",
    },
  ];

  // initialize expanded parents that are active
  const [expanded, setExpanded] = useState(() =>
    menuItems
      .filter(
        (it) =>
          Array.isArray(it.children) &&
          it.children.length > 0 &&
          (pathname === it.href || pathname.startsWith(`${it.href}/`))
      )
      .map((it) => it.href)
  );

  return (
    <div className="flex h-screen flex-col bg-white shadow-[2px_0px_16px_0px_#00000026]">
      <div className="bg-primary flex h-[58px] items-center justify-center px-4">
        <GuardedLink href="/">
          <div className="flex flex-col items-center">
            <Image
              src="/svg/logo-muatmuat.svg"
              alt="MuatMuat Logo"
              width={120}
              height={32}
            />
          </div>
          <div className="-mt-1 text-center text-sm font-semibold text-white">
            <p>BO GM Muatrans</p>
          </div>
        </GuardedLink>
      </div>
      <div className="mt-4 flex flex-grow flex-col gap-[5px] overflow-y-auto px-[13px] py-2">
        {menuItems.map((item, index) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          const hasChildren =
            Array.isArray(item.children) && item.children.length > 0;
          const isExpanded = expanded.includes(item.href);
          // when parent has children and is expanded, don't apply active style to parent
          const parentActive = hasChildren ? !isExpanded && isActive : isActive;
          return (
            <div key={index}>
              {hasChildren ? (
                <button
                  type="button"
                  onClick={() =>
                    setExpanded((prev) =>
                      prev.includes(item.href)
                        ? prev.filter((p) => p !== item.href)
                        : [...prev, item.href]
                    )
                  }
                  aria-expanded={isExpanded}
                  className={`flex w-full items-center justify-between rounded-lg px-[10px] py-2 text-left transition-colors duration-200 ${
                    parentActive ? "bg-primary text-white" : "hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center">
                    <div className="mr-3">
                      <IconComponent
                        src={item.icon}
                        alt={item.name}
                        width={24}
                        height={24}
                        color={parentActive ? "white" : "black"}
                      />
                    </div>
                    <span className="text-sm font-semibold">{item.name}</span>
                  </div>
                  <IconComponent
                    src="/icons/chevron-right.svg"
                    alt="Chevron Right"
                    width={20}
                    height={20}
                    color={parentActive ? "white" : "black"}
                    className={`transform transition-transform ${isExpanded ? "rotate-90" : ""}`}
                  />
                </button>
              ) : (
                <GuardedLink
                  href={item.href}
                  className={`flex items-center justify-between rounded-lg px-[10px] py-2 transition-colors duration-200 ${
                    parentActive ? "bg-primary text-white" : "hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center">
                    <div className="mr-3">
                      <IconComponent
                        src={item.icon}
                        alt={item.name}
                        width={24}
                        height={24}
                        color={parentActive ? "white" : "black"}
                      />
                    </div>
                    <span className="text-sm font-semibold">{item.name}</span>
                  </div>
                </GuardedLink>
              )}
              {hasChildren && (
                <div
                  className={`flex flex-col space-y-[5px] overflow-hidden transition-all duration-300 ease-in-out ${
                    isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  {item.children.map((child, ci) => {
                    const childActive =
                      pathname === child.href ||
                      pathname.startsWith(`${child.href}/`);
                    return (
                      <GuardedLink
                        key={ci}
                        href={child.href}
                        className={`flex w-full items-center justify-between rounded-lg p-[10px] pl-10 text-sm transition-colors duration-200 ${
                          childActive
                            ? "bg-primary text-white"
                            : "text-gray-900 hover:bg-gray-100"
                        }`}
                      >
                        <div className="flex items-center">
                          <span
                            className={`mr-1.5 inline-block size-1.5 rounded-full ${
                              childActive ? "bg-white" : "bg-black"
                            }`}
                          />
                          <span className="truncate text-sm font-semibold">
                            {child.name}
                          </span>
                        </div>
                        <div />
                      </GuardedLink>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
