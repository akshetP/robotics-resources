import React from "react";
import Image from "next/image";
import Link from "next/link";

const Ros2Page = () => {

  return(
    <div>
      {/*Desktop Layout */}
      <div className="hidden md:flex flex-col items-center h-[250px] justify-center p-[20px]">
        <div className="flex flex-col pb-[10px] items-center justify-center">
          <Image
            src={'/icons/ros.svg'}
            width={70}
            height={70}
            alt={"ms"}
          />
          <h1 className="text-3xl font-bold text-black">ROS2 Resources</h1>
        </div>
        <div className="flex flex-col gap-y-[55px] p-[30px] w-[1250px] h-[500px]">
          <div className="flex gap-x-[90px]">
            <Link href={'https://www.youtube.com/playlist?list=PLRE44FoOoKf7NzWwxt3W2taZ7BiWyfhCp'} className="hover:scale-105 transition duration-300 flex items-center border-[2px] bg-white p-[10px] border-[#0004FF] justify-center rounded-[20px] w-40 h-40">
               <h1>ROS2 Tutorial for Beginners(Foxy)</h1>
            </Link>
            <Link href={'https://www.youtube.com/watch?v=Gg25GfA456o'} className="hover:scale-105 transition duration-300 flex items-center justify-center bg-white p-[10px] border-[2px] border-[#0004FF] rounded-[20px] w-40 h-40">
              <h1>ROS2 Humble 2H50 [Crash Course]</h1>
            </Link>
            <Link href={'https://www.youtube.com/playlist?list=PLLSegLrePWgJudpPUof4-nVFHGkB62Izy'} className="flex items-center justify-center hover:scale-105 transition duration-300 bg-white p-[10px] rounded-[20px] border-[2px] border-[#0004FF] w-40 h-40">
              <h1>ROS2 Humble for Beginners</h1>
            </Link>
            <Link href={'https://www.youtube.com/playlist?list=PLL57Sz4fhxLpCXgN0lvCF7aHAlRA5FoFr'} className="hover:scale-105 transition duration-300 flex items-center justify-center p-[10px] bg-white rounded-[20px] border-[2px] border-[#0004FF] w-40 h-40">
              <h1>Self-Driving Cars with ROS2 & Autoware</h1>
            </Link>
            <Link href={'https://www.youtube.com/playlist?list=PLNw2RD-1J5YZbyWXCpas9zPJldfphPi4Q'} className="hover:scale-105 transition duration-300 flex items-center justify-center p-[10px] bg-white rounded-[20px] border-[2px] border-[#0004FF] w-40 h-40">
              <h1>ROS2 Tutorials</h1>
            </Link>
          </div>
        </div>
      </div>
      {/*Mobile Layout*/}
      <div className="md:hidden h-[360px]">
        <div className="flex flex-col pb-[10px] items-center justify-center">
          <Image
            src={'/icons/ros.svg'}
            width={40}
            height={40}
            alt={"ms"}
          />
          <h1 className="text-lg font-bold text-black">ROS2 Resources</h1>
        </div>
        <div className="flex flex-col gap-y-[10px] p-[10px] w-[360px] h-[400px]">
          <div className="flex space-x-[2px]">
            <Link href={'https://www.youtube.com/playlist?list=PLRE44FoOoKf7NzWwxt3W2taZ7BiWyfhCp'} className="flex items-center border-[2px] bg-white p-[10px] border-[#0004FF] justify-center rounded-[20px] w-28 h-30">
               <h1 className="font-medium text-xs text-black">ROS2 Tutorial for Beginners(Foxy)</h1>
            </Link>
            <Link href={'https://www.youtube.com/watch?v=Gg25GfA456o'} className="flex items-center justify-center bg-white p-[10px] border-[2px] border-[#0004FF] rounded-[20px] w-28 h-30">
              <h1 className="font-medium text-xs text-black">ROS2 Humble 2H50 [Crash Course]</h1>
            </Link>
            <Link href={'https://www.youtube.com/playlist?list=PLLSegLrePWgJudpPUof4-nVFHGkB62Izy'} className="flex items-center justify-center bg-white p-[10px] rounded-[20px] border-[2px] border-[#0004FF] w-28 h-30">
              <h1 className="font-medium text-xs text-black">ROS2 Humble for Beginners</h1>
            </Link>
          </div>
          <div className="flex space-x-[2px]">
            <Link href={'https://www.youtube.com/playlist?list=PLL57Sz4fhxLpCXgN0lvCF7aHAlRA5FoFr'} className="flex items-center justify-center p-[10px] bg-white rounded-[20px] border-[2px] border-[#0004FF] w-28 h-30">
              <h1 className="font-medium text-xs text-black">Self-Driving Cars with ROS2 & Autoware</h1>
            </Link>
            <Link href={'https://www.youtube.com/playlist?list=PLNw2RD-1J5YZbyWXCpas9zPJldfphPi4Q'} className="flex items-center justify-center p-[10px] bg-white rounded-[20px] border-[2px] border-[#0004FF] w-28 h-30">
              <h1 className="font-medium text-xs text-black">ROS2 Tutorials</h1>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ros2Page;
