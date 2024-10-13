import { Inter } from "next/font/google";
import "../styles/globals.css";
import SessionWrapper from "@/components/Auth/SessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Cache.",
  description:
    "Modern Educational Resource Sharing Application, made by the team ADSLabs.",
};

export default function RootLayout({ children }) {
return (
    <html lang="en" className="bg-black text-white">
        <head>
            <link rel="icon" href="/images/favicon.png" />
            <link rel="manifest" href="/manifest.json" />
        </head>
        <SessionWrapper>
            <body className={`${inter.className} bg-black text-white`}>{children}</body>
        </SessionWrapper>
    </html>
);
}
