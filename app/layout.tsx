import type { Metadata } from "next";
import Link from "next/link";

import "./globals.css";

export const metadata: Metadata = {
  title: "Robotics Resources Library",
  description: "It Was a Robotics Resources Library Website. #Robot #ROS #Akshet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
        <footer className="flex mt-[20px] mb-[20px] items-center justify-center">
          <h1 className="text-[8px]">Developed By <Link href={'https://www.muflih.me'} className='underline hover:text-[#0004FF]'>Mohammed Muflih</Link></h1>
        </footer>
      </body>
    </html>
  );
}
