import Link from 'next/link'

interface Courses {
  name: string;
  displayName: string;
  href: string;
}

export const Courses: Courses[] = [
  { name: 'self-driving cars with duckietown', displayName: 'Self-Driving Cars with Duckietown', href: 'https://duckietown.com/mooc/' },
  { name: 'introduction robotics by massachusetts institute of technology', displayName: 'Introduction Robotics by Massachusetts Institute of Technology', href: 'https://ocw.mit.edu/courses/2-12-introduction-to-robotics-fall-2005/' },
  { name: 'OUT', displayName: 'QUT Robot Academy by QUT (Queensland University of Technology)', href: 'https://robotacademy.net.au/' },
  { name: 'intro to robot by standford', displayName: 'Introduction to Robotics by Standford University', href: 'https://see.stanford.edu/Course/CS223A' },
  { name: 'introduction to mobile robotics', displayName: 'Introduction to Mobile Robotics by the University of Freiburg', href: 'http://ais.informatik.uni-freiburg.de/teaching/ss16/robotics/index_en.php' },
];

export const CourseCard: React.FC<{ repo: Courses; isMobile?: boolean; className?: string }> = ({ repo, isMobile = false }) => {
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
