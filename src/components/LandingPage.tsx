import Courses from "./Courses";
import Footer from "./Footer";
import Hero from "./HeroSection";
import NavBar from "./NavBar";

export default function LandingPage() {
    return  <div className="bg-BackgroundColor min-h-screen min-w-full font-display">
      <NavBar />
      <Hero />
      <Courses />
      <Footer />
  </div>

}