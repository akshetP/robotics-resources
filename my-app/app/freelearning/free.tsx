import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Courses {
  name: string;
  displayName: string;
  href: string;
}

const Courses: Courses[] = [
  { name: 'self-driving cars with duckietown', displayName: 'Self-Driving Cars with Duckietown', href: 'https://duckietown.com/mooc/' },
  { name: 'introduction robotics by massachusetts institute of technology', displayName: 'Introduction Robotics by Massachusetts Institute of Technology', href: 'https://ocw.mit.edu/courses/2-12-introduction-to-robotics-fall-2005/' },
  { name: 'OUT', displayName: 'QUT Robot Academy by QUT (Queensland University of Technology)', href: 'https://robotacademy.net.au/' },
  { name: 'intro to robot by standford', displayName: 'Introduction to Robotics by Standford University', href: 'https://see.stanford.edu/Course/CS223A' },
  { name: 'introduction to mobile robotics', displayName: 'Introduction to Mobile Robotics by the University of Freiburg', href: 'http://ais.informatik.uni-freiburg.de/teaching/ss16/robotics/index_en.php' },
];

const CourseCard: React.FC<{ repo: Courses; isMobile?: boolean; className?: string }> = ({ repo, isMobile = false }) => {
  return (
    <Link href={repo.href} className={`bg-white rounded-[20px] border-2 border-[#0004FF] hover:shadow-lg hover:scale-105 duration-300 transition-all cursor-pointer flex items-center justify-center ${
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

const RoboticsCourses: React.FC = () => {
  return (
    <div className="mt-[40px] h-[400px]">
      {/* Mobile Layout */}
      <div className="block lg:hidden px-4">
        <div className="max-w-sm">
          {/* Mobile Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg mb-3">
              <Image
                src={'/icons/streamline_class-lesson-solid.svg'}
                width={40}
                height={40}
                alt='logo'
                />
            </div>
            <h1 className="text-lg font-bold text-black mb-2 leading-tight">
              Free University Courses
            </h1>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {Courses.map((repo, index) => (
              <CourseCard key={`mobile-${index}`} repo={repo} isMobile={true}/>
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
                src={'/icons/streamline_class-lesson-solid.svg'}
                width={50}
                height={50}
                alt='logo'
                />
            </div>
            <h1 className="text-3xl font-bold text-black mb-4">
              Free University Courses
            </h1>
          </div>

          {/* Desktop Grid - 5 columns × 3 rows */}
          <div className="grid grid-cols-5 gap-6 p-[20px]">
            {Courses.map((repo, index) => (
              <CourseCard key={`desktop-${index}`} repo={repo} isMobile={false} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

  export default RoboticsCourses;
