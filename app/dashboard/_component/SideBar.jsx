"use client";
import React from "react";
import Image from "next/image";
import logo from "../../images/logo.svg";
import { LayoutDashboard, Shield, UserCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

const SideBar = () => {
  const navItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      link: "/dashboard",
    },
    {
      title: "Profile",
      icon: UserCircle,
      link: "/dashboard/profile",
    },

    {
      title: "Upgrade",
      icon: Shield,
      link: "/dashboard/upgrade",
    },
  ];
  const path = usePathname();
  return (
    <div className="h-screen shadow-md bg-gray-100 relative">
      <div className="p-6 flex items-center gap-3 border-b border-gray-200">
        <Image
          src={logo}
          alt="logo"
          width={60}
          height={60}
          className="hover:scale-105 transition-transform"
        />{" "}
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-wide">
            Prelearn
          </h1>{" "}
        </div>
      </div>
      <div className="mt-6 p-4">
        <Link href="/create">
          <button className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">
            + create new
          </button>
        </Link>
      </div>
      {navItems.map((item, index) => (
        <div
          key={index}
          className={`flex items-center gap-4 p-4 hover:bg-gray-200 cursor-pointer ${
            path === item.link ? "bg-gray-200" : ""
          }`}
        >
          <item.icon size={20} className="text-gray-600" />
          <div className="text-gray-600 hover:text-blue-500 transition-colors">
            {item.title}
          </div>
        </div>
      ))}
      {/* <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 border bg-slate-100 rounded-lg p-5 w-[95%]">
        <h2 className="text-lg mb-2">Available credits : 5</h2>
        <Progress value={20} />
        <h2 className="text-sm">1 out of 5 credit use</h2>
        <a href={"/dashboard/upgrade"} className="text-blue-500 text-xs">
          Upgrade to create more
        </a>
      </div> */}
    </div>
  );
};

export default SideBar;
