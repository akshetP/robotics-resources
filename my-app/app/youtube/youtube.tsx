import React from 'react';
import Image from 'next/image';
import Link from 'next/link'

interface Youtube {
  name: string;
  displayName: string;
  href: string;
}

const YoutubeChannel: Youtube[] = [
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

const YoutubePlaylist: Youtube[] = [
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

const YoutubeCard: React.FC<{ repo: Youtube; isMobile?: boolean; className?: string }> = ({ repo, isMobile = false }) => {
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

const RoboticsYoutube: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#C2DAFF]">
      {/* Mobile Layout */}
      <div className="block lg:hidden px-4">
        <div className="max-w-sm">
          {/* Mobile Header */}
          <div className="text-center mb-6">
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
          </div>
          <h2 className='pb-[5px] font-medium text-black text-[20px]'>Channels</h2>
          <div className="grid grid-cols-3 gap-3">
            {YoutubeChannel.map((you, index) => (
              <YoutubeCard key={`mobile-${index}`} repo={you} isMobile={true}/>
            ))}
          </div>
          <h2 className='pb-[5px] pt-[20px] font-medium text-black text-[20px]'>Playlists</h2>
          <div className='grid grid-cols-3 gap-3'>
            {YoutubePlaylist.map((play, index) => (
              <YoutubeCard key={`${index}`} repo={play} isMobile={true}/>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block p-8 pl-[70px]">
        <div className="max-w-7xl">
          {/* Desktop Header */}
          <div className="text-center mb-12">
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
          </div>
          <h2 className='text-black font-medium text-[25px] ml-[20px]'>Channels</h2>

          {/* Desktop Grid - 5 columns × 3 rows */}
          <div className="grid grid-cols-5 gap-6 p-[20px]">
            {YoutubeChannel.map((you, index) => (
              <YoutubeCard key={`desktop-${index}`} repo={you} isMobile={false} />
            ))}
          </div>

          <h2 className='text-black font-medium mt-[20px] text-[25px] ml-[20px]'>Playlists</h2>

          <div className='grid grid-cols-5 gap-6 p-[20px]'>
            {YoutubePlaylist.map((play,index) => (
              <YoutubeCard key={`${index}`} repo={play} isMobile={false} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoboticsYoutube;
