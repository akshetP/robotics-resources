import Home from "./home/home";
import Projects from "./projects/project";
export default function Main() {
  return (
    <div>
      <section className="h-screen">
        <Home />
      </section>
      <section className="h-screen">
        <Projects/>
      </section>
    </div>
  );
}
