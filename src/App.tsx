import { BrowserRouter, Route, Routes } from "react-router-dom"
import LandingPage from "./components/LandingPage"
import LogInPage from "./components/Login"
import SignIn from "./components/SignIn"
import Webdev from "./components/Webdev"
import Devops from "./components/Devops"

function App() {

  return <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/webdevcourse" element={<Webdev />} />
        <Route path="/devopscourse" element={<Devops />} />
      </Routes>
    </BrowserRouter>
  </div>
}

export default App
