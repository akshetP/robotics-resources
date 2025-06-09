import Link from 'next/link'

interface Simulator {
  name: string;
  displayName: string;
  href: string;
}

export const Simulators: Simulator[] = [
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

export const SimulatorCard: React.FC<{ repo: Simulator; isMobile?: boolean; className?: string }> = ({ repo, isMobile = false }) => {
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
