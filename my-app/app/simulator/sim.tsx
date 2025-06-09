import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Simulator {
  name: string;
  displayName: string;
  href: string;
}

const Simulators: Simulator[] = [
  { name: 'gym-duckietown', displayName: 'Gym Duckietown', href: 'https://github.com/duckietown/gym-duckietown' },
  { name: 'NVidia', displayName: 'NVIDIA Isaac Sim', href: 'https://developer.nvidia.com/isaac/sim' },
  { name: 'Gazebo by Open Robotics', displayName: 'Gazebo by Open Robotics', href: 'https://classic.gazebosim.org/' },
  { name: 'robodk', displayName: 'RoboDK', href: 'https://robodk.com/' },
  { name: 'webots', displayName: 'Webots', href: 'https://cyberbotics.com/' },
  { name: 'agx dynamics', displayName: 'AGX Dynamics', href: 'https://www.algoryx.se/agx-dynamics/' },
  { name: 'sim', displayName: 'Simscape', href: 'https://uk.mathworks.com/products/simscape.html' },
  { name: 'morse', displayName: 'MORSE', href: 'https://morse-simulator.github.io/' },
  { name: 'aws robomaker', displayName: 'AWS Robomaker', href: 'https://aws.amazon.com/robomaker/' },
  { name: 'coppeliasim', displayName: 'CoppeliaSim', href: 'https://coppeliarobotics.com/' },
  { name: 'CenitFastSuite', displayName: 'CenitFastSuite Edition 2', href: 'https://www.cenit.com/en_EN/solutions-services/software-solutions/fastsuite-edition-2.html' },
  { name: 'Dassault Systemes 3D Experience', displayName: 'Dassault Systemes 3D Experience', href: 'https://www.3ds.com/products/delmia/industrial-engineering/robotics' },
  { name: 'open', displayName: 'Open Modelica', href: 'https://openmodelica.org/' },
  { name: 'siemens', displayName: 'Siemens Robotics', href: 'https://plm.sw.siemens.com/en-US/nx/manufacturing/robotic-machining-programming/' },
  { name: 'abb', displayName: 'ABB Robot Studio', href: 'https://new.abb.com/products/robotics/robotstudio' },
  { name: 'real', displayName: 'realvirtual.io', href: 'https://realvirtual.io/' },
  { name: 'twin', displayName: 'twin', href: 'https://www.digifai.com/en/twin/' },
  { name: 'mujoco', displayName: 'mujoco', href: 'https://github.com/google-deepmind/mujoco' },
  { name: 'Visual', displayName: 'Visual Components', href: 'https://www.visualcomponents.com/' },
  { name: 'unity', displayName: 'Unity', href: 'https://unity.com/' }
];

const SimulatorCard: React.FC<{ repo: Simulator; isMobile?: boolean; className?: string }> = ({ repo, isMobile = false }) => {
  return (
    <Link href={repo.href} className={`bg-white rounded-[20px] border-2 border-[#0004FF] hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer flex items-center justify-center ${
      isMobile ? 'p-3 h-30 w-28' : 'p-6 h-40 w-40'
    }`}>
      <h3 className={`font-medium text-black leading-tight text-center ${
        isMobile ? 'text-xs' : 'text-sm'
      }`}>
        {repo.displayName}
      </h3>
    </Link>
  );
};

const RoboticsSimulators: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#C2DAFF]">
      {/* Mobile Layout */}
      <div className="block lg:hidden px-4">
        <div className="max-w-sm">
          {/* Mobile Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg mb-3">
              <Image
                src={'/icons/ix_project-simulation.svg'}
                width={40}
                height={40}
                alt='logo'
                />
            </div>
            <h1 className="text-lg font-bold text-black mb-2 leading-tight">
              Robotic Simulator
            </h1>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {Simulators.map((repo, index) => (
              <SimulatorCard key={`mobile-${index}`} repo={repo} isMobile={true}/>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block mt-[150px] p-8 pl-[70px]">
        <div className="max-w-7xl">
          {/* Desktop Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg mb-6">
              <Image
                src={'/icons/ix_project-simulation.svg'}
                width={50}
                height={50}
                alt='logo'
                />
            </div>
            <h1 className="text-3xl font-bold text-black mb-4">
              Robotic Simulator
            </h1>
          </div>

          {/* Desktop Grid - 5 columns × 3 rows */}
          <div className="grid grid-cols-5 gap-6 p-[20px]">
            {Simulators.map((repo, index) => (
              <SimulatorCard key={`desktop-${index}`} repo={repo} isMobile={false} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoboticsSimulators;
