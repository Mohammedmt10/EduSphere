import CardElement from "./components/Card"
import Courses from "./components/Courses"
import Footer from "./components/Footer"
import Hero from "./components/HeroSection"
import NavBar from "./components/NavBar"

function App() {

  return <div className="bg-[#1E1E1E] min-h-screen">
    <NavBar />
    <Hero />
    <Courses />
    <Footer />
  </div>

}

export default App
