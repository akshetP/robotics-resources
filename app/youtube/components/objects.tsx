import Link from "next/link"

interface Youtube {
  name: string;
  displayName: string;
  href: string;
}

export const YoutubeChannel: Youtube[] = [
  { name: 'duckietown', displayName: 'Duckietown', href: 'https://www.youtube.com/@duckietown' },
  { name: 'LearnRobotics by Liz Miller ', displayName: 'Learn Robotics by Liz Miller', href: 'https://www.youtube.com/@LearnRobotics' },
  { name: 'aniskoubaa237 by Anis Koubaa', displayName: 'aniskoubaa237 by Anis Koubaa', href: 'https://www.youtube.com/@aniskoubaa2327' },
  { name: 'articulated robotics', displayName: 'Articulated Robotics', href: 'https://www.youtube.com/@ArticulatedRobotics' },
  { name: 'dronebot workshop', displayName: 'Drone Bot Workshop', href: 'https://www.youtube.com/@Dronebotworkshop'},
  { name: 'hashrobotics', displayName: 'Hash Robotics', href: 'https://www.youtube.com/@HashRobotics' },
  { name: 'james bruton', displayName: 'James Bruton', href: 'https://www.youtube.com/@jamesbruton' },
  { name: 'mecharithm-robotics and mechatronics', displayName: 'Mcharithm-Robotics and Mechatronics', href: 'https://www.youtube.com/@mecharithm-robotics' },
  { name: 'Robomechtrix', displayName: 'Robomechtrix', href: 'https://www.youtube.com/@ROBOMECHTRIX' },
  { name: 'roboticsbackend', displayName: 'RoboticsBackend', href: 'https://www.youtube.com/@RoboticsBackEnd' }
];

export const YoutubePlaylist: Youtube[] = [
  { name: 'robotics 501: Mathematics for Robotics', displayName: 'Robotics 501: Mathematics for Robotics', href: 'https://www.youtube.com/playlist?list=PLdPQZLMHRjDIzO99aE7yAtdOHSVHMXfYH' },
  { name: 'introduction to robotics', displayName: 'Introduction to Robotics', href: 'https://www.youtube.com/playlist?list=PLyqSpQzTE6M_XM9cvjLLO_Azt1FkgPhpH' },
  { name: 'robotics manipulation fall 2023', displayName: 'Robotics Manipulation Fall 2023', href: 'https://www.youtube.com/playlist?list=PLkx8KyIQkMfWr191lqbN8WfV08j-ui8WX' },
  { name: 'underactuated robotics, spring 2021', displayName: 'Underactuated Robotics, spring 2021', href: 'https://www.youtube.com/watch?v=_1CtAHVea8I&list=PLkx8KyIQkMfUmB3j-DyP58ThDXM7enA8x' },
  { name: 'cognitive robotics, spring 2016', displayName:'Cognitive Robotics, Spring 2016', href: 'https://www.youtube.com/playlist?list=PLUl4u3cNGP62Bkdzwe7caTZC7soj7ZYvk' },
  { name: 'robotics institute seminar series', displayName: 'Robotics Institute Seminar Series', href: 'https://www.youtube.com/playlist?list=PLCFD85BC79FE703DF' },
  { name: 'robot dynamics 2022', displayName: 'Robot Dynamics 2022', href: 'https://www.youtube.com/playlist?list=PLZnJoM76RM6ItAfZIxJYNKdaR_BobleLY' },
  { name: 'optimal control 2023', displayName: 'Optimal Control 2023', href: 'https://www.youtube.com/playlist?list=PLZnJoM76RM6KugDT9sw5zhAmqKnGeoLRa' },
  { name: 'Introduction to robotics course', displayName: 'Introduction to Robotics Course', href: 'https://www.youtube.com/playlist?list=PL4847E1D1C121292F' },
  { name: 'Modern Robotics by northwestern university', displayName: 'Modern Robotics by Northwestern University', href: 'https://www.youtube.com/playlist?list=PLggLP4f-rq02vX0OQQ5vrCxbJrzamYDfx' }
];

export const YoutubeCard: React.FC<{ repo: Youtube; isMobile?: boolean; className?: string }> = ({ repo, isMobile = false }) => {
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

