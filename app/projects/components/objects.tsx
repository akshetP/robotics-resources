import Link from "next/link";
import Image from "next/image";

interface ProjectCard {
  id: string;
  name: string;
  icon: string;
  href: string;
  description?: string;
}

export const projects: ProjectCard[] = [
  { id: '1', name: 'Mini Pupper', icon: '/images/projects/minipupper.svg', href: 'https://minipupperdocs.readthedocs.io/en/latest/index.html' },
  { id: '2', name: 'Open-Source Rover by NASA Jet Propulsion Laboratory', icon: '/images/projects/nasa.svg', href: 'https://github.com/nasa-jpl/open-source-rover#getting-started' },
  { id: '3', name: 'OpenPodCar', icon: '/images/projects/openpodcar.svg', href: 'https://github.com/OpenPodcar/OpenPodcar' },
  { id: '4', name: 'EROS - 1', icon: '/images/projects/pens-eros.svg', href: 'https://github.com/PENS-EROS' },
  { id: '5', name: 'FITENTH', icon: '/images/projects/roboracer.svg', href: 'https://f1tenth.org/learn.html' },
  { id: '6', name: 'The Autoware Foundation', icon: '/images/projects/Autoware.svg', href: 'https://github.com/autowarefoundation' },
  { id: '7', name: 'machinascript-for-robots', icon: '/images/projects/babycommando.svg', href: 'https://github.com/babycommando/machinascript-for-robots' },
  { id: '8', name: 'Duckietown', icon: '/images/projects/duckietown.svg', href: 'https://github.com/duckietown' },
  { id: '9', name: 'Robot-Overlord-App', icon: '/images/projects/MarginallyClever.svg', href: 'https://github.com/marginallyclever/robot-overlord-app' },
  { id: '10', name: 'ROSbloX', icon: '/images/projects/ROSblo.svg', href: 'https://rosblox.github.io/' },
  { id: '11', name: 'andino', icon: '/images/projects/andio.svg', href: 'https://github.com/Ekumen-OS/andino' },
  { id: '12', name: 'The Open Motion Planning Library', icon: '/images/projects/ompl.svg', href: 'https://ompl.kavrakilab.org/' },
  { id: '13', name: 'TortoiseBot', icon: '/images/projects/tortoisebot.svg', href: 'https://github.com/rigbetellabs/tortoisebot' },
];

export const ProjectCard: React.FC<{ project: ProjectCard; className?: string }> = ({ 
  project, 
  className = "" 
}) => {
  return (
    <Link href={project.href} className={`
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
    </Link>
  );
};

export const FindMoreCard: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <Link href={'https://www.openrobothardware.org/linkedprojects/'} className={`
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
    </Link>
  );
};

