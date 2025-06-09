"use client"
import React from 'react';
import Image from 'next/image';
import { fadeIn } from '@/public/variant/variant';
import { motion } from 'framer-motion';
import { YoutubeCard,YoutubeChannel,YoutubePlaylist } from './components/objects';

const RoboticsYoutube: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#C2DAFF]">
      {/* Mobile Layout */}
      <div className="block lg:hidden px-4">
        <div className="max-w-sm">
          {/* Mobile Header */}
          <motion.div
            variants={fadeIn('up', 0.2)}    
            initial="hidden"                
            whileInView="show"             
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg ">
              <Image
                src={'/icons/mdi_youtube.svg'}
                width={40}
                height={40}
                alt='logo'
                />
            </div>
            <h1 className="text-lg font-bold text-black mb-2 leading-tight">
              Youtube Channels & Playlists to Learn Robotics
            </h1>
          </motion.div>
          <motion.h2
            variants={fadeIn('up', 0.2)}    
            initial="hidden"                
            whileInView="show"             
            viewport={{ once: true, amount: 0.3 }}
            className='pb-[5px] font-medium text-black text-[20px]'>Channels
          </motion.h2>
          <motion.div
            variants={fadeIn('up', 0.2)}    
            initial="hidden"                
            whileInView="show"             
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-3 gap-3">
            {YoutubeChannel.map((you, index) => (
              <YoutubeCard key={`mobile-${index}`} repo={you} isMobile={true}/>
            ))}
          </motion.div>
          <motion.h2
            variants={fadeIn('up', 0.2)}    
            initial="hidden"                
            whileInView="show"             
            viewport={{ once: true, amount: 0.3 }}
          className='pb-[5px] pt-[20px] font-medium text-black text-[20px]'>Playlists</motion.h2>
          <motion.div
            variants={fadeIn('up', 0.2)}    
          initial="hidden"                
          whileInView="show"             
          viewport={{ once: true, amount: 0.3 }}
            className='grid grid-cols-3 gap-3'>
            {YoutubePlaylist.map((play, index) => (
              <YoutubeCard key={`${index}`} repo={play} isMobile={true}/>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block p-8 pl-[70px]">
        <div className="max-w-7xl">
          {/* Desktop Header */}
          <motion.div
            variants={fadeIn('up', 0.2)}    
            initial="hidden"                
            whileInView="show"             
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg mb-6">
              <Image
                src={'/icons/mdi_youtube.svg'}
                width={50}
                height={50}
                alt='logo'
                />
            </div>
            <h1 className="text-3xl font-bold text-black mb-4">
              Youtube Channels & Playlists to Learn Robotics
            </h1>
          </motion.div>
          <motion.h2
            variants={fadeIn('up', 0.2)}    
            initial="hidden"                
            whileInView="show"             
            viewport={{ once: true, amount: 0.3 }}
            className='text-black font-medium text-[25px] ml-[20px]'>Channels
          </motion.h2>

          {/* Desktop Grid - 5 columns × 3 rows */}
          <motion.div
            variants={fadeIn('up', 0.2)}    
            initial="hidden"                
            whileInView="show"             
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-5 gap-6 p-[20px]">
            {YoutubeChannel.map((you, index) => (
              <YoutubeCard key={`desktop-${index}`} repo={you} isMobile={false} />
            ))}
          </motion.div>

          <motion.h2
            variants={fadeIn('up', 0.2)}    
            initial="hidden"                
            whileInView="show"             
            viewport={{ once: true, amount: 0.3 }}
            className='text-black font-medium mt-[20px] text-[25px] ml-[20px]'>Playlists
          </motion.h2>

          <motion.div
            variants={fadeIn('up', 0.2)}    
            initial="hidden"                
            whileInView="show"             
            viewport={{ once: true, amount: 0.3 }}
            className='grid grid-cols-5 gap-6 p-[20px]'>
            {YoutubePlaylist.map((play,index) => (
              <YoutubeCard key={`${index}`} repo={play} isMobile={false} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RoboticsYoutube;
