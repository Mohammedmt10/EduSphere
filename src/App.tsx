import { BrowserRouter, Route, Routes } from "react-router-dom"
import LandingPage from "./components/LandingPage"
import LogInPage from "./components/Login"
import SignIn from "./components/SignIn"
import PurchasedCourses from "./components/purchasedCourses"
import CourseDetails from "./components/CourseDetails"
import CourseContent from "./components/CourseContent"
import LecturePlayer from "./components/LecturePlayer"
import TestPage from "./components/Test"
import AdminDashboard from "./components/AdminDashboard"
import AdminSignIn from "./components/AdminSignUp"
import AdminLogIn from "./components/AdminLoginPage"
import CourseForm from "./components/CourseForm"
import AddLectures from "./components/addLectures"
import PaymentSuccessfull from "./components/paymentSuccessfull"

function App() {

  return <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignIn />} />
        <Route path="/adminLogin" element={<AdminLogIn />} />
        <Route path="/adminSignup" element={<AdminSignIn />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/purchasedCourses" element={<PurchasedCourses />} />
        <Route path="/content/:id" element={<CourseContent />} />
        <Route path="/lecture/:id" element={<LecturePlayer />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/createCourse" element={<CourseForm />} />
        <Route path="/addLectures/:id" element={<AddLectures />} />
        <Route path="/paymentSuccessfull/:id/:courseId" element={<PaymentSuccessfull />} />
      </Routes>
    </BrowserRouter>
  </div>
}

export default App
