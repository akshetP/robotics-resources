"use client"
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeIn } from '@/public/variant/variant';
import {projects, ProjectCard, FindMoreCard} from './components/objects'

const Projects: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Desktop Layout */}
      <div className="hidden md:block">
        <div className="flex h-screen">
          {/* Main Content Area */}
          <div className="flex-1 p-8">
            <div className="h-full">
              {/* Header */}
              <motion.div
                variants={fadeIn('up', 0.5)}    
                initial="hidden"                
                whileInView="show"             
                viewport={{ once: true, amount: 0.3 }}
                className="flex justify-center items-center mb-12">
                <div className="rounded-full flex items-center justify-center mr-4">
                  <Image
                    src={"/icons/project.svg"}
                    width={50}
                    height={50}
                    alt='head'
                  />
                </div>
                <h1 className="text-black text-3xl font-bold">
                  Open Source Robotics Projects Github Repositories
                </h1>
              </motion.div>

              {/* Desktop Project Grid - 3 rows x 5 columns */}
              <motion.div
                variants={fadeIn('up', 0.2)}    
                initial="hidden"                
                whileInView="show"             
                viewport={{ once: true, amount: 0.3 }}
                className="grid grid-cols-5 gap-6 mt-[10px] p-[20px] pl-[60px] w-full">
                {/* First Row */}
                <ProjectCard project={projects[0]} className="h-40 w-40" />
                <ProjectCard project={projects[1]} className="h-40 w-40" />
                <ProjectCard project={projects[2]} className="h-40 w-40" />
                <ProjectCard project={projects[3]} className="h-40 w-40" />
                <ProjectCard project={projects[4]} className="h-40 w-40" />
                
                {/* Second Row */}
                <ProjectCard project={projects[5]} className="h-40 w-40" />
                <ProjectCard project={projects[6]} className="h-40 w-40" />
                <ProjectCard project={projects[7]} className="h-40 w-40" />
                <ProjectCard project={projects[8]} className="h-40 w-40" />
                <ProjectCard project={projects[9]} className="h-40 w-40" />
                
                {/* Third Row */}
                <ProjectCard project={projects[10]} className="h-40 w-40" />
                <ProjectCard project={projects[11]} className="h-40 w-40" />
                <ProjectCard project={projects[12]} className="h-40 w-40" />
                <FindMoreCard className="h-40 w-40" />
                <div></div> {/* Empty space */}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="p-4">
          {/* Mobile Header */}
          <motion.div
            variants={fadeIn('up', 0.2)}    
            initial="hidden"                
            whileInView="show"             
            viewport={{ once: true, amount: 0.3 }}
            className="items-center justify-center mb-8">
            <div className="rounded-full flex items-center justify-center mr-3">
              <Image
                src={"/icons/project.svg"}
                width={40}
                height={40}
                alt='MobileS'
              />
            </div>
            <h1 className="flex items-center justify-center text-black text-lg font-bold leading-tight">
              Open Source Robotics Projects Github Repositories
            </h1>
          </motion.div>

          {/* Mobile Grid - 4 rows x 3 columns */}
          <motion.div
            variants={fadeIn('up', 0.2)}    
            initial="hidden"                
            whileInView="show"             
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-3 gap-3 space-y-[10px] mt-[20px">
            {/* First Row */}
            <ProjectCard project={projects[0]} className="h-30 w-28" />
            <ProjectCard project={projects[1]} className="h-30 w-28" />
            <ProjectCard project={projects[2]} className="h-30 w-28" />
            
            {/* Second Row */}
            <ProjectCard project={projects[3]} className="h-30 w-28" />
            <ProjectCard project={projects[4]} className="h-30 w-28" />
            <ProjectCard project={projects[9]} className="h-30 w-28" />
            
            {/* Third Row */}
            <ProjectCard project={projects[6]} className="h-30 w-28" />
            <ProjectCard project={projects[7]} className="h-30 w-28"/>
            <ProjectCard project={projects[8]} className="h-30 w-28" />
            
            {/* Fourth Row */}
            <ProjectCard project={projects[5]} className="h-30 w-28 " />
            <ProjectCard project={projects[10]} className="h-30 w-28" />
            <FindMoreCard className="h-30 w-28"/>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
