import { BrowserRouter, Route, Routes } from "react-router-dom"
import Homepage from "../pages/Homepage"
import LoginPage from "../pages/LoginPage"
import SignupPage from "../pages/SignupPage"

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="login"element={<LoginPage/>}/>
      <Route path="signup"element={<SignupPage/>}/>
    </Routes>
  </BrowserRouter>
)

export default AppRouter