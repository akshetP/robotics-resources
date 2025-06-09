"use client"
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeIn } from "@/public/variant/variant";

const RosPage = () => {

  return(
    <div>
      {/*Desktop Layout */}
      <div className="hidden md:flex flex-col items-center justify-center p-[20px]">
        <motion.div
          variants={fadeIn('up', 0.2)}    
          initial="hidden"                
          whileInView="show"             
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col pb-[10px] items-center justify-center">
          <Image
            src={'/icons/ros.svg'}
            width={70}
            height={70}
            alt={"ms"}
          />
          <h1 className="text-3xl font-bold text-black">ROS Resources</h1>
        </motion.div>
        <motion.div
          variants={fadeIn('up', 0.2)}    
          initial="hidden"                
          whileInView="show"             
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col gap-y-[55px] p-[30px] w-[1250px] h-[500px]">
          <div className="flex gap-x-[90px]">
            <Link href={'https://ocw.tudelft.nl/courses/hello-real-world-ros-robot-operating-system/'} className="hover:scale-105 transition duration-300 flex items-center border-[2px] bg-white p-[10px] border-[#0004FF] justify-center rounded-[20px] w-40 h-40">
               <h1>By Delft University of Technology Netherlands</h1>
            </Link>
            <Link href={'https://rsl.ethz.ch/education-students/lectures/ros.html'} className="hover:scale-105 transition duration-300 flex items-center justify-center bg-white p-[10px] border-[2px] border-[#0004FF] rounded-[20px] w-40 h-40">
              <h1>By ETH Zurich,Switzerland</h1>
            </Link>
            <Link href={'https://web.ics.purdue.edu/~rvoyles/Classes/ROSprogramming/index.html'} className="hover:scale-105 duration-300 transition flex items-center justify-center bg-white p-[10px] rounded-[20px] border-[2px] border-[#0004FF] w-40 h-40">
              <h1>By Purdue University, USA</h1>
            </Link>
            <Link href={'https://sir.upc.edu/projects/rostutorials/'} className="hover:scale-105 duration-300 transition flex items-center justify-center p-[10px] bg-white rounded-[20px] border-[2px] border-[#0004FF] w-40 h-40">
              <h1>By Universitat Politecnica de Catalunya, Barcelona</h1>
            </Link>
            <Link href={'https://automatika.etf.bg.ac.rs/sr/13e054trs'} className="hover:scale-105 transition duration-300 flex items-center justify-center p-[10px] bg-white rounded-[20px] border-[2px] border-[#0004FF] w-40 h-40">
              <h1>By University of Belgrade, Serbia</h1>
            </Link>
          </div>
          <div className="flex gap-x-[90px]">
            <Link href={'https://github.com/cse481sp17/cse481c/wiki'} className="hover:scale-105 transition duration-300 flex items-center justify-center p-[10px] bg-white rounded-[20px] border-[2px] border-[#0004FF] w-40 h-40">
              <h1>By University of Washington, USA</h1>
            </Link>
            <Link href={'https://github.com/vmayoral/ros-robotics-companies'} className= "hover:scale-105 transition duration-300 flex items-center justify-center p-[10px] bg-white rounded-[20px] border-[2px] border-[#0004FF] w-40 h-40">
              <h1>Companies working with ROS</h1>
            </Link>
            <Link href={'https://github.com/ps-micro/awesome-ros'} className="hover:scale-105 transition duration-300 flex items-center justify-center p-[10px] bg-white rounded-[20px] border-[2px] border-[#0004FF] w-40 h-40">
              <h1>awesome-ros</h1>
            </Link>
          </div>
        </motion.div>
      </div>

      {/*Mobile Layout*/}
      <div className="md:hidden">
        <motion.div
          variants={fadeIn('up', 0.2)}    
          initial="hidden"                
          whileInView="show"             
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col pb-[10px] items-center justify-center">
          <Image
            src={'/icons/ros.svg'}
            width={40}
            height={40}
            alt={"ms"}
          />
          <h1 className="text-lg font-bold text-black">ROS Resources</h1>
        </motion.div>
        <motion.div
          variants={fadeIn('up', 0.2)}    
          initial="hidden"                
          whileInView="show"             
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col gap-y-[10px] p-[10px] w-[360px] h-[400px]">
          <div className="flex space-x-[2px]">
            <Link href={'https://ocw.tudelft.nl/courses/hello-real-world-ros-robot-operating-system/'} className="flex items-center border-[2px] bg-white p-[10px] border-[#0004FF] justify-center rounded-[20px] w-28 h-30">
               <h1 className="font-medium text-xs text-black">By Delft University of Technology Netherlands</h1>
            </Link>
            <Link href={'https://rsl.ethz.ch/education-students/lectures/ros.html'} className="flex items-center justify-center bg-white p-[10px] border-[2px] border-[#0004FF] rounded-[20px] w-28 h-30">
              <h1 className="font-medium text-xs text-black">By ETH Zurich,Switzerland</h1>
            </Link>
            <Link href={'https://web.ics.purdue.edu/~rvoyles/Classes/ROSprogramming/index.html'} className="flex items-center justify-center bg-white p-[10px] rounded-[20px] border-[2px] border-[#0004FF] w-28 h-30">
              <h1 className="font-medium text-xs text-black">By Purdue University, USA</h1>
            </Link>
          </div>
          <div className="flex space-x-[2px]">
            <Link href={'https://sir.upc.edu/projects/rostutorials/'} className="flex items-center justify-center p-[10px] bg-white rounded-[20px] border-[2px] border-[#0004FF] w-28 h-30">
              <h1 className="font-medium text-xs text-black">By Universitat Politecnica de Catalunya, Barcelona</h1>
            </Link>
            <Link href={'https://automatika.etf.bg.ac.rs/sr/13e054trs'} className="flex items-center justify-center p-[10px] bg-white rounded-[20px] border-[2px] border-[#0004FF] w-28 h-30">
              <h1 className="font-medium text-xs text-black">By University of Belgrade, Serbia</h1>
            </Link>
            <Link href={'https://github.com/cse481sp17/cse481c/wiki'} className="flex items-center justify-center p-[10px] bg-white rounded-[20px] border-[2px] border-[#0004FF] w-28 h-30">
              <h1 className="font-medium text-xs text-black">By University of Washington, USA</h1>
            </Link>
          </div>
          <div className="flex space-x-[2px]">
            <Link href={'https://github.com/vmayoral/ros-robotics-companies'} className= "flex items-center justify-center p-[10px] bg-white rounded-[20px] border-[2px] border-[#0004FF] w-28 h-30">
              <h1 className="font-medium text-xs text-black">Companies working with ROS</h1>
            </Link>
            <Link href={'https://github.com/ps-micro/awesome-ros'} className="flex items-center justify-center p-[10px] bg-white rounded-[20px] border-[2px] border-[#0004FF] w-28 h-30">
              <h1 className="font-medium text-xs text-black">awesome-ros</h1>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default RosPage;
