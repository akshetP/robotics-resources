import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Repository {
  name: string;
  displayName: string;
  href: string;
}

const Repositories: Repository[] = [
  { name: 'robotics_resources', displayName: 'Robotics Resources', href: 'https://github.com/addy1997/Robotics-Resources' },
  { name: 'awesome-mobile-robotics', displayName: 'Awesome Mobile Robotics', href: 'https://github.com/mathiasmantelli/awesome-mobile-robotics' },
  { name: 'awesome-robotics', displayName: 'Awesome Robotics', href: 'https://github.com/kiloreux/awesome-robotics' },
  { name: 'pythonrobotics', displayName: 'PythonRobotics', href: 'https://github.com/AtsushiSakai/PythonRobotics' },
  { name: 'dynamic-robot-localization', displayName: 'Dynamic Robot Localization', href: 'https://github.com/carlosmccosta/dynamic_robot_localization' },
  { name: 'robotics-and-machine-vision-resources', displayName: 'Robotics And Machine Vision Resources', href: 'https://github.com/ColinShaw/robotics-and-machine-vision-resources' },
  { name: 'books-courses-software', displayName: 'Books, Courses & Software', href: 'https://github.com/kiloreux/awesome-robotics' },
  { name: 'robotics-courses', displayName: 'Robotics Courses', href: 'https://github.com/mithi/robotics-coursework' },
  { name: 'awesome-machine-learning-for-robotics', displayName: 'Awesome Machine Learning for Robotics', href: 'https://github.com/Phylliade/awesome-machine-learning-robotics' },
  { name: 'machine-learning-for-robotics', displayName: 'Machine Learning for Robotics', href: 'https://github.com/Phylliade/awesome-machine-learning-robotics' },
  { name: 'introduction-to-robotics-and-perception', displayName: 'Introduction to Robotics and Perception', href: 'https://github.com/gtbook/robotics' },
  { name: 'robot-framework', displayName: 'Robot Framework', href: 'https://github.com/robotframework/robotframework' },
  { name: 'robotics-research-papers', displayName: 'Robotics Research Papers', href: 'https://github.com/ColinShaw/robotics-and-machine-vision-resources#interesting-and-relevant-articles' },
  { name: 'learn-robotics-beginner-moderate-advanced', displayName: 'Learn Robotics - Beginner, Moderate & Advanced', href: 'https://github.com/kfupmRoboticsClub/learn-Robotics/tree/main' },
  { name: 'robotics-resources', displayName: 'Robotics Resources', href: 'https://github.com/addy1997/Robotics-Resources' }
];

const RepositoryCard: React.FC<{ repo: Repository; isMobile?: boolean; className?: string }> = ({ repo, isMobile = false }) => {
  return (
    <Link href={repo.href} className={`bg-white rounded-[20px] border-2 border-[#0004FF] hover:shadow-lg hover:scale-105 duration-200 transition-all cursor-pointer flex items-center justify-center ${
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

const RoboticsRepositories: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#C2DAFF]">
      {/* Mobile Layout */}
      <div className="block lg:hidden px-4">
        <div className="max-w-sm">
          {/* Mobile Header */}
          <div className="text-center mb-6">
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
          </div>

          <div className="grid grid-cols-3 gap-3">
            {Repositories.map((repo, index) => (
              <RepositoryCard key={`mobile-${index}`} repo={repo} isMobile={true}/>
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
                src={'/icons/repository.svg'}
                width={50}
                height={50}
                alt='logo'
                />
            </div>
            <h1 className="text-3xl font-bold text-black mb-4">
              Github Repositories to Learn Robotics
            </h1>
          </div>

          {/* Desktop Grid - 5 columns × 3 rows */}
          <div className="grid grid-cols-5 gap-6 p-[20px]">
            {Repositories.map((repo, index) => (
              <RepositoryCard key={`desktop-${index}`} repo={repo} isMobile={false} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoboticsRepositories;
