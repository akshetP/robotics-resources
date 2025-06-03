import React from 'react';
import Image from 'next/image';

interface ProjectCard {
  id: string;
  name: string;
  icon: string;
  description?: string;
}

const projects: ProjectCard[] = [
  { id: '1', name: 'Mini Pupper', icon: '/images/projects/minipupper.svg' },
  { id: '2', name: 'Open-Source Rover by NASA Jet Propulsion Laboratory', icon: '/images/projects/nasa.svg' },
  { id: '3', name: 'OpenPodCar', icon: '/images/projects/openpodcar.svg' },
  { id: '4', name: 'EROS - 1', icon: '/images/projects/pens-eros.svg' },
  { id: '5', name: 'FITENTH', icon: '/images/projects/roboracer.svg' },
  { id: '6', name: 'The Autoware Foundation', icon: '/images/projects/Autoware.svg' },
  { id: '7', name: 'machinascript-for-robots', icon: '/images/projects/babycommando.svg' },
  { id: '8', name: 'Duckietown', icon: '/images/projects/duckietown.svg' },
  { id: '9', name: 'Robot-Overlord-App', icon: '/images/projects/MarginallyClever.svg' },
  { id: '10', name: 'ROSbloX', icon: '/images/projects/ROSblo.svg' },
  { id: '11', name: 'andino', icon: '/images/projects/andio.svg' },
  { id: '12', name: 'The Open Motion Planning Library', icon: '/images/projects/ompl.svg' },
  { id: '13', name: 'TortoiseBot', icon: '/images/projects/tortoisebot.svg' },
];

const ProjectCard: React.FC<{ project: ProjectCard; className?: string }> = ({ 
  project, 
  className = "" 
}) => {
  return (
    <div className={`
      bg-white 
      border-2 
      border-[#0004FF] 
      rounded-xl 
      p-4 
      flex 
      flex-col 
      items-center 
      justify-center 
      text-center 
      hover:shadow-lg 
      transition-all 
      duration-200
      hover:scale-105
      ${className}
    `}>
      <Image
        src={project.icon}
        width={50}
        height={50}
        alt='null'
        className={`${ ((project.id) == '2') ? "mb-[0px]" : "mb-[10px]" }`}
      />
      <div className={`text-black text-sm font-medium leading-tight ${ ((project.id) == '2') ? "text-[10px] mb-[10px]" : "text-sm" }`}>
        {project.name}
      </div>
    </div>
  );
};

const FindMoreCard: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`
      bg-white 
      border-2 
      border-[#0004FF] 
      rounded-xl 
      p-4 
      flex 
      flex-col 
      items-center 
      justify-center 
      text-center 
      cursor-pointer
      hover:shadow-lg 
      transition-all 
      duration-200
      hover:scale-105
      hover:bg-blue-50
      ${className}
    `}>
      <Image
        src={'/images/projects/Vector.svg'}
        width={30}
        height={30}
        alt='find'
        className='md:mb-[20px]'
      />
      <div className="text-black text-sm font-medium leading-tight px-2">
        Find more projects here
      </div>
    </div>
  );
};

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
              <div className="flex justify-center items-center mb-12">
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
              </div>

              {/* Desktop Project Grid - 3 rows x 5 columns */}
              <div className="flex items-center justify-center grid grid-cols-5 gap-6 mt-[10px] p-[20px] pl-[60px] w-full">
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
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="p-4">
          {/* Mobile Header */}
          <div className="flex items-center justify-center mb-8">
            <div className="rounded-full flex items-center justify-center mr-3">
              <Image
                src={"/icons/project.svg"}
                width={30}
                height={30}
                alt='MobileS'
              />
            </div>
            <h1 className="text-black text-[15px] font-bold leading-tight">
              Open Source Robotics Projects Github Repositories
            </h1>
          </div>

          {/* Mobile Grid - 4 rows x 3 columns */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {/* First Row */}
            <ProjectCard project={projects[0]} className="h-28 w-25" />
            <ProjectCard project={projects[1]} className="h-32" />
            <ProjectCard project={projects[2]} className="h-32" />
            
            {/* Second Row */}
            <ProjectCard project={projects[3]} className="h-32" />
            <ProjectCard project={projects[4]} className="h-32" />
            <ProjectCard project={projects[9]} className="h-32" />
            
            {/* Third Row */}
            <ProjectCard project={projects[6]} className="h-32" />
            <ProjectCard project={projects[7]} className="h-32" />
            <ProjectCard project={projects[8]} className="h-32" />
            
            {/* Fourth Row */}
            <ProjectCard project={projects[5]} className="h-32" />
            <ProjectCard project={projects[10]} className="h-32" />
            <FindMoreCard className="h-32" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
