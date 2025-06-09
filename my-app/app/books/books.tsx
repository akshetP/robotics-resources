import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Book {
  name: string;
  displayName: string;
  href: string;
}

const Books: Book[] = [
  { name: 'ROS Robotics by Example', displayName: 'ROS Robotics by Example', href: 'https://sceweb.sce.uhcl.edu/harman/CENG5437_MobileRobots/Webitems2020/ROS_ROBOTICS_BY_EXAMPLE_SECOND_EDITION.pdf' },
  { name: 'ROS Robot Programming', displayName: 'ROS Robot Programming', href: 'https://www.pishrobot.com/wp-content/uploads/2021/05/ros-robot-programming-book-by-turtlebo3-developers-en.pdf' },
  { name: 'Learning ROS for Robotics Programming', displayName: 'Learning ROS for Robotics Programming', href: 'https://github.com/fjibj/ROSplay/blob/master/Learning%20ROS%20for%20Robotics%20Programming%20-%20Second%20Edition.pdf' },
  { name: 'A Gentle Introduction to ROS', displayName: 'A Gentle Introduction to ROS', href: 'https://jokane.net/agitr/agitr-letter.pdf' },
  { name: 'Programming Robots with ROS', displayName: 'Programming Robots with ROS', href: 'http://alvarestech.com/temp/capp/GDT_Forma3D/Programming%20Robots%20with%20ROS%20by%20Morgan%20Quigley,%20Brian%20Gerkey,%20William%20D.%20Smart%20(z-lib.org).pdf' },
  { name: 'Robot Operating System for Absolute Beginners', displayName: 'Robot Operating System for Absolute Beginners', href: 'http://wiki.iranros.com/wp-content/uploads/2019/10/Lentin-Joseph-Robot-Operating-SystemROSfor-Absolute-Beginners_IRANROS.COM2018.pdf' },
];

const BookCard: React.FC<{ repo: Book; isMobile?: boolean; className?: string }> = ({ repo, isMobile = false }) => {
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

const RoboticsBooks: React.FC = () => {
  return (
    <div className="h-[400px]">
      {/* Mobile Layout */}
      <div className="block lg:hidden px-4">
        <div className="max-w-sm">
          {/* Mobile Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg mb-3">
              <Image
                src={'/icons/icon-park-solid_bookshelf.svg'}
                width={40}
                height={40}
                alt='logo'
                />
            </div>
            <h1 className="text-lg font-bold text-black mb-2 leading-tight">
              Books to Learn Robotics
            </h1>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {Books.map((repo, index) => (
              <BookCard key={`mobile-${index}`} repo={repo} isMobile={true}/>
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
                src={'/icons/icon-park-solid_bookshelf.svg'}
                width={50}
                height={50}
                alt='logo'
                />
            </div>
            <h1 className="text-3xl font-bold text-black mb-4">
              Books to Learn Robotics
            </h1>
          </div>

          {/* Desktop Grid - 5 columns × 3 rows */}
          <div className="grid grid-cols-5 gap-6 p-[20px]">
            {Books.map((repo, index) => (
              <BookCard key={`desktop-${index}`} repo={repo} isMobile={false} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoboticsBooks;
