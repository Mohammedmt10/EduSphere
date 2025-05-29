import Courses from "./Courses";
import Footer from "./Footer";
import Hero from "./HeroSection";
import NavBar from "./NavBar";

export default function LandingPage() {
    return  <div className="bg-[#1E1E1E] min-h-screen">
    <div>
      <NavBar />
      <Hero />
      <Courses />
      <Footer />
    </div>
  </div>

}