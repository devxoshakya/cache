"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Navigation/Footer";

export default function Home() {
    return (
    <>
        <main className="">
        <nav className="m-0 p-0 fixed top-0 w-full bg-black z-50 max-h-16">
            <div className="flex justify-between items-center px-2 pr-4 md:px-16">
                <div className="w-full py-4 px-0 gap-2">
                <Image src="/images/ads-labs-icon.svg" alt="Logo" width="200" height="100" />
                
                </div>
                <div>
                <Link href="/signup">
                <Button className="ml-2 bg-blue-500 font-semibold hover:!bg-blue-700">
                    Get Started
                </Button>
                </Link>
                </div>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </nav>
        <div className="flex justify-center items-center h-screen">
            <div className="text-center">
                <h1 className="text-4xl font-bold">Welcome to ADS Labs</h1>
                <p className="text-lg mt-4">The best place to find your dream job</p>
                <Link href="/signup">
                <Button className="mt-4 bg-blue-500 font-semibold hover:!bg-blue-700">
                    Get Started
                </Button>
                </Link>
            </div>
        </div>
        <Footer className="bottom-0 my-auto" />
        </main>
    </>
  );
}
