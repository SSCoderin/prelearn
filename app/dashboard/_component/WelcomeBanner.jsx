"use client";
import React from "react";
import Image from "next/image";
import Logo from "../../images/logo.svg";
import { useUser } from "@clerk/nextjs";
const WelcomeBanner = () => {
  const { user } = useUser();
  return (
    <div>
      {/* {user?.fullName}
      {user?.id} */}
      <div className="flex w-full flex-row items-center gap-6 rounded-md p-6 bg-gradient-to-r from-blue-500 to-blue-400 shadow-lg">
        <Image src={Logo} alt="logo" width={100} height={100} className="hover:scale-105 transition-transform" />

        <div className="flex flex-col justify-start space-y-2">
          <h1 className="text-4xl font-bold text-black tracking-wide">PreLearn</h1>
          <h2 className="text-lg text-white/90">
            Hello! <span className="font-bold underline decoration-2 hover:text-white transition-colors">{user?.fullName}</span>
          </h2>
        </div>
      </div>
    </div>  );
};

export default WelcomeBanner;
