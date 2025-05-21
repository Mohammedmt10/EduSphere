import { BrowserRouter, Route, Routes } from "react-router-dom"
import LandingPage from "./components/LandingPage"
import LogInPage from "./components/Login"
import SignIn from "./components/SignIn"
import PurchasedCourses from "./components/purchasedCourses"
import CourseDetails from "./components/CourseDetails"
import CourseContent from "./components/CourseContent"
import LecturePlayer from "./components/LecturePlayer"

function App() {

  return <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignIn />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/purchasedCourses" element={<PurchasedCourses />} />
        <Route path="/content/:id" element={<CourseContent />} />
        <Route path="/lecture/:id" element={<LecturePlayer />} />
      </Routes>
    </BrowserRouter>
  </div>
}

export default App
