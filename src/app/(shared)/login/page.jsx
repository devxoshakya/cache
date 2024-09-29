"use client";
import React from "react";
import { IconBrandGoogle } from "@tabler/icons-react";
import { Vortex } from "@/components/ui/vortex";
import { signIn } from "next-auth/react";

const page = () => {
  const handleOAuthSignIn = (provider) => {
    signIn(provider, { callbackUrl: "/home" });
  };

  return (
    <>
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={500}
        baseHue={120}
        className="flex items-center flex-col justify-center px-2 md:px-10"
      >
        <div className="flex justify-center items-center mx-auto min-h-screen">
          <button
            className=" text-center justify-center border-white md:border-[2px] border-none   group/btn flex space-x-2 items-center  px-4  min-w-[16rem]  rounded-md h-10 font-medium shadow-input text-white backdrop-blur-lg	 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="button"
            onClick={() => handleOAuthSignIn("google")}
          >
            <span className="text-neutral-300 text-sm">login with</span>
            <IconBrandGoogle className="h-4 w-4 dark:text-neutral-300" />
            <span className="dark:text-neutral-300 text-sm">Google</span>
          </button>
        </div>
      </Vortex>
    </>
  );
};

export default page;
