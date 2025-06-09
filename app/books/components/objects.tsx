import Link from "next/link"

interface Book {
  name: string;
  displayName: string;
  href: string;
}

export const Books: Book[] = [
  { name: 'ROS Robotics by Example', displayName: 'ROS Robotics by Example', href: 'https://sceweb.sce.uhcl.edu/harman/CENG5437_MobileRobots/Webitems2020/ROS_ROBOTICS_BY_EXAMPLE_SECOND_EDITION.pdf' },
  { name: 'ROS Robot Programming', displayName: 'ROS Robot Programming', href: 'https://www.pishrobot.com/wp-content/uploads/2021/05/ros-robot-programming-book-by-turtlebo3-developers-en.pdf' },
  { name: 'Learning ROS for Robotics Programming', displayName: 'Learning ROS for Robotics Programming', href: 'https://github.com/fjibj/ROSplay/blob/master/Learning%20ROS%20for%20Robotics%20Programming%20-%20Second%20Edition.pdf' },
  { name: 'A Gentle Introduction to ROS', displayName: 'A Gentle Introduction to ROS', href: 'https://jokane.net/agitr/agitr-letter.pdf' },
  { name: 'Programming Robots with ROS', displayName: 'Programming Robots with ROS', href: 'http://alvarestech.com/temp/capp/GDT_Forma3D/Programming%20Robots%20with%20ROS%20by%20Morgan%20Quigley,%20Brian%20Gerkey,%20William%20D.%20Smart%20(z-lib.org).pdf' },
  { name: 'Robot Operating System for Absolute Beginners', displayName: 'Robot Operating System for Absolute Beginners', href: 'http://wiki.iranros.com/wp-content/uploads/2019/10/Lentin-Joseph-Robot-Operating-SystemROSfor-Absolute-Beginners_IRANROS.COM2018.pdf' },
];

export const BookCard: React.FC<{ repo: Book; isMobile?: boolean; className?: string }> = ({ repo, isMobile = false }) => {
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


