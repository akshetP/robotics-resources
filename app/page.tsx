import RoboticsCourses from "./freelearning/free";
import Home from "./home/home";
import Projects from "./projects/project";
import RoboticsRepositories from "./repositories/repo"
import RosPage from "./ros/ros";
import Ros2Page from "./ros2/ros2";
import RoboticsYoutube from "./youtube/youtube";
import RoboticsBooks from "./books/books";
import RoboticsSimulators from "./simulator/sim";

export default function Main() {
  return (
    <div>
      <section id="home" className="h-screen">
        <Home />
      </section>
      <section id="project" className="h-[690px]">
        <Projects/>
      </section>
      <section id="repository" className="">
        <RoboticsRepositories />
      </section>
      <section id="ros">
        <RosPage/>
      </section>
      <section id="ros2">
        <Ros2Page/>
      </section>
      <section id="youtube">
        <RoboticsYoutube/>
      </section>
      <section id="course">
        <RoboticsCourses />
      </section>
      <section id="book">
        <RoboticsBooks/>
      </section>
      <section id="simulator">
        <RoboticsSimulators/>
      </section>
    </div>
  );
}
