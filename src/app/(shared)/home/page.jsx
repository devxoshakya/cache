"use client";
import React, { useState, useEffect } from "react";
import { Sidebar, SidebarBody, SidebarFileSystem, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";


export default function SidebarDemo() {


    const { data: session, status } = useSession();
    

  const links = [
    {
      label: "Source",
      href: "#",
      icon: (
        <IconBrandTabler className="text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  const imageSrc = session?.user?.image;
  const name = session?.user?.name;
  return (
    (<div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-neutral-800 w-full flex-1 min-w-full mx-auto border border-neutral-700 overflow-hidden",
        // for your use case, use `h-screen` instead of `h-[60vh]`
        "h-screen"
      )}>
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
              <SidebarFileSystem/>
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: name,
                href: "#",
                icon: (
                  <Image
                    src={imageSrc}
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar" />
                ),
              }} />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>)
  );
}
export const Logo = () => {
  return (
    (<Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
        
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-semibold text-white whitespace-pre">
      
      Cache
      </motion.span>
    </Link>)
  );
};
export const LogoIcon = () => {
  return (
    (<Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
    <Image src="/images/ads-labs-logo.svg" height={100} width={100} className="fill-black">

    </Image>
    </Link>)
  );
};


// Dummy dashboard component with content
const Dashboard = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  const checkIsDesktop = () => {
    setIsDesktop(window.innerWidth >= 768);
  };

  useEffect(() => {
    // Initial check
    checkIsDesktop();

    // Event listener for window resize
    window.addEventListener('resize', checkIsDesktop);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('resize', checkIsDesktop);
    };
  }, []);
  
  // create a isDesktop function with 786px breakpoint



  return (
    <>
     {isDesktop ? <DesktopArrow /> : <MobileArrow />}
    </>
  );
};

const DesktopArrow = () => {
  return(
    (
    <div className="flex flex-1 ">
      <div
        className="p-2  md:p-10 rounded-tl-2xl border border-neutral-700 bg-neutral-900 flex flex-col gap-2 flex-1 w-full min-h-screen">
        <div className="h-[40vh] gap-0 w-full md:w-[40%] pt-8 flex">
          <Image src={"/images/arrow.svg"} className="rotate-[266deg] " height={450} width={250} alt="pointer"></Image>
          <h1 className="font-mono font-bold text-2xl mt-32 "> *click here* </h1>
        </div>
      </div>
    </div>)
  );
};


const MobileArrow = ({props}) => {
  return(
    (<div className="flex flex-1" {...props}>
      <div
        className="p-2 md:p-10 rounded-tl-2xl border border-neutral-700 bg-neutral-900 flex flex-col gap-2 flex-1 w-full min-h-screen">
        <div className="h-[40vh] gap-0 w-full md:w-[40%] pt-8 pr-2 flex-col">
          <h1 className="font-mono font-bold text-2xl ml-16"> *click here* </h1>
          <Image src={"/images/arrow.svg"} className="ml-36 " height={450} width={200} alt="pointer"></Image>
        </div>
      </div>
    </div>)
  );
};