"use client"
import React from 'react';
import Image from 'next/image';
import { fadeIn } from '@/public/variant/variant';
import { motion } from 'framer-motion';
import {Repositories, RepositoryCard} from './components/objects'

const RoboticsRepositories: React.FC = () => {
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
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg mb-3">
              <Image
                src={'/icons/repository.svg'}
                width={40}
                height={40}
                alt='logo'
                />
            </div>
            <h1 className="text-lg font-bold text-black mb-2 leading-tight">
              Github Repositories to Learn Robotics
            </h1>
          </motion.div>

          <motion.div
            variants={fadeIn('up', 0.2)}    
            initial="hidden"                
            whileInView="show"             
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-3 gap-3">
            {Repositories.map((repo, index) => (
              <RepositoryCard key={`mobile-${index}`} repo={repo} isMobile={true}/>
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
                src={'/icons/repository.svg'}
                width={50}
                height={50}
                alt='logo'
                />
            </div>
            <h1 className="text-3xl font-bold text-black mb-4">
              Github Repositories to Learn Robotics
            </h1>
          </motion.div>

          {/* Desktop Grid - 5 columns × 3 rows */}
          <motion.div
            variants={fadeIn('up', 0.2)}    
            initial="hidden"                
            whileInView="show"             
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-5 gap-6 p-[20px]">
            {Repositories.map((repo, index) => (
              <RepositoryCard key={`desktop-${index}`} repo={repo} isMobile={false} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RoboticsRepositories;
