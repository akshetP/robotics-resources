"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { fadeIn } from '@/public/variant/variant';
import {socialLinks,resourceCards} from './components/objects'

export default function Home() {
  return (
    <div className="h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.h1
          variants={fadeIn("left",0.1)}
          initial="hidden"
          animate="show"
          className="text-[36px] md:text-[48px] md:text-4xl text-center font-medium text-black mb-2 md:mb-12">
          Robotics Resources by <Link href={'https://akshetpatel.com/'} className="hover:text-[#0004FF] duration-300 underline">Akshet Patel</Link>
        </motion.h1>

        {/* Desktop Layout */}
        <div className="hidden md:block">
          <div className="grid grid-cols-12 gap-8">
            {/* Left side - Book promotion */}
            <motion.div
              variants={fadeIn('right',0.2)}
              initial="hidden"
              animate="show"
              className="col-span-5">
              <div className="bg-white flex flex-col items-center justify-center w-[350px] h-[480px] rounded-[20px] border-4 border-[#0004FF] shadow-lg">
                <Link href={'https://www.packtpub.com/en-us/product/ros-2-from-scratch-9781835881408?utm_medium=affiliate&utm_campaign=b15ea442-7568-4d6f-1a81-656ec9f041f4&utm_term=c35266a5-72a8-2df8-489e-63be22b85913&utm_content=B22403'}>
                  <Image
                    width={280}
                    height={350}
                    src={"/images/projects/cover_image.webp"}
                    alt='Book'
                    className='rounded-[20px]'
                  />
                  <p className="text-center text-black mt-2 mb-2">(Affiliate Link) Grab your copy:</p>
                </Link>
                <div className="flex space-x-4 justify-center">
                  <Link href={'https://www.packtpub.com/en-us/product/ros-2-from-scratch-9781835881415?utm_medium=affiliate&utm_campaign=b15ea442-7568-4d6f-1a81-656ec9f041f4&utm_term=c35266a5-72a8-2df8-489e-63be22b85913&utm_content=B22403'} className="px-6 py-2 bg-[#C2DAFF] rounded-full text-black font-medium shadow-md hover:bg-[#0004FF] hover:text-white transition-colors duration-500">
                    eBook
                  </Link>
                  <Link href={'https://www.packtpub.com/en-us/product/ros-2-from-scratch-9781835881408?utm_medium=affiliate&utm_campaign=b15ea442-7568-4d6f-1a81-656ec9f041f4&utm_term=c35266a5-72a8-2df8-489e-63be22b85913&utm_content=B22403'} className="px-6 py-2 bg-[#C2DAFF] rounded-full text-black shadow-md font-medium hover:bg-[#0004FF] hover:text-white transition-colors duration-500">
                    Print
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Right side - Resource grid */}
            <div className="col-span-7">
              <motion.div
                variants={fadeIn("left",0.1)}
                initial="hidden"
                animate="show"
                className="grid grid-cols-4 gap-6 mb-8">
                {resourceCards.slice(0, 4).map((card, index) => (
                  <Link href={card.href} key={index} className="bg-white w-[166px] h-[166px] rounded-xl p-6 border-2 border-[#0004FF] shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl mb-4 mx-auto`}>
                      <Image
                        src={card.icon}
                        width={30}
                        height={30}
                        alt='iconsDesktop'
                      />
                    </div>
                    <h3 className="text-center text-gray-800 font-medium text-sm leading-tight">
                      {card.title}
                    </h3>
                  </Link>
                ))}
              </motion.div>

              {/* Social Links */}
              <motion.div
                variants={fadeIn("left",0.2)}
                initial="hidden"
                animate="show"
                className="bg-white rounded-xl p-4 border-2 border-[#0004FF] shadow-md mb-8">
                <div className="flex justify-center space-x-[60px]">
                  {socialLinks.map((link, index) => (
                    <Link key={index} href={link.href} className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold hover:scale-110 transition-transform`}>
                      {(index == 0)?(
                          <Image 
                            src={link.icon}
                            alt= "${index}"
                            width={40}
                            height={40}
                          />
                        ):(
                          <Image
                            src={link.icon}
                            alt='${index}'
                            height={50}
                            width={50}
                          />
                        )
                      }
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* Bottom resource grid */}
              <motion.div
                variants={fadeIn("left",0.2)}
                initial="hidden"
                animate="show"
                className="grid grid-cols-4 gap-6">
                {resourceCards.slice(4).map((card, index) => (
                  <Link href={card.href} key={index} className="bg-white w-[166px] h-[166px] rounded-xl p-6 border-2 border-[#0004FF] shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                    <div className={`rounded-[20px] flex items-center justify-center text-white text-xl mb-4 mx-auto`}>
                      <Image
                        src={card.icon}
                        width={30}
                        height={30}
                        alt='IconsMobile'
                      />
                    </div>
                    <h3 className="text-center text-gray-800 font-medium text-sm leading-tight">
                      {card.title}
                    </h3>
                  </Link>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden space-y-[10px] flex flex-col justify-center items-center">
          <motion.div
            variants={fadeIn('left', 0.2)}
            initial="hidden"
            animate="show"
            className="bg-white h-[61px] flex items-center justify-center w-[330px] rounded-xl p-4 border-2 border-[#0004FF] shadow-md">
            <div className="flex justify-center items-center  space-x-[30px]">
              {socialLinks.map((link, index) => (
                <Link key={index} href={link.href} className={`rounded-[20px] flex items-center justify-center hover:scale-110 transition-transform`}>
                  { (index == 0) ? (
                      <Image
                        src={link.icon}
                        width={25}
                        height={25}
                        alt='"X"'
                      />
                    ) : (
                      <Image
                        src={link.icon}
                        width={30}
                        height={30}
                        alt='iconsMobile'
                      />
                    )
                  }
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Book promotion */}
          <motion.div
            variants={fadeIn('right', 0.2)}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center w-[200px] h-[300px] justify-center bg-white rounded-[20px] p-6 border-2 border-[#0004FF] shadow-lg">
            <Link href={'https://www.packtpub.com/en-us/product/ros-2-from-scratch-9781835881408?utm_medium=affiliate&utm_campaign=b15ea442-7568-4d6f-1a81-656ec9f041f4&utm_term=c35266a5-72a8-2df8-489e-63be22b85913&utm_content=B22403'}>
              <Image
                src="/images/projects/cover_image.webp"
                width={180}
                height={80}
                alt='coverImage'
              />
            </Link>
            <p className="text-center text-black mt-2 mb-2 text-[10px]">(Affiliate Link) Grab your copy:</p>
            <div className="flex space-x-4 justify-center">
              <Link href={'https://www.packtpub.com/en-us/product/ros-2-from-scratch-9781835881415?utm_medium=affiliate&utm_campaign=b15ea442-7568-4d6f-1a81-656ec9f041f4&utm_term=c35266a5-72a8-2df8-489e-63be22b85913&utm_content=B22403'} className="px-4 py-2 bg-blue-200 rounded-full text-gray-700 font-medium text-sm hover:bg-blue-300 transition-colors">
                eBook
              </Link>
              <Link href={'https://www.packtpub.com/en-us/product/ros-2-from-scratch-9781835881408?utm_medium=affiliate&utm_campaign=b15ea442-7568-4d6f-1a81-656ec9f041f4&utm_term=c35266a5-72a8-2df8-489e-63be22b85913&utm_content=B22403'} className="px-4 py-2 bg-blue-200 rounded-full text-gray-700 font-medium text-sm hover:bg-blue-300 transition-colors">
                Print
              </Link>
            </div>
          </motion.div>

          <motion.div
            variants={fadeIn('left', 0.2)}
            initial="hidden"
            animate="show"
            className="grid grid-cols-4 gap-4">
            {resourceCards.map((card, index) => (
              <Link href={card.href} key={index} className="bg-white flex flex-col mt-[25px] items-center justify-center rounded-xl w-[80px] h-[80px] p-4 border-2 border-[#0004FF] shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                <div className={`rounded-lg flex items-center justify-center text-white text-lg mb-[10px] `}>
                  <Image 
                    src={card.icon}
                    width={20}
                    height={20}
                    alt='Icon'
                  />
                </div>
                { (index == 0 || index == 4) ?(
                    <h3 className="text-center text-black font-medium text-[7px] leading-[9px]">
                      {card.title}
                    </h3>
                   ) : (
                    <h3 className='text-center text-black font-medium text-[10px] leading-[9px]'>
                      {card.title}
                    </h3>
                   )
                }
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
