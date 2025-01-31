import './App.css';
import Home from "./Home/Home";
import {Route, Routes} from "react-router-dom";
import RegisterAdmin from "./LoginAndRegisters/RegisterAsAdmin/RegisterAdmin";
import RegisterStudent from "./LoginAndRegisters/RegisterAsStudent/RegisterStudent";
import LoginStudent from "./LoginAndRegisters/LoginAsStudent/LoginStudent";
import LoginAdmin from "./LoginAndRegisters/LoginAsAdmin/LoginAdmin";
import AboutUs from "./Home/AboutUs";
import Profile from "./StudentDashborad/Profile";
import Applyod from './StudentDashborad/Applyod';
import Lab from './StudentDashborad/Lab';
import Mentor from './StudentDashborad/Mentor';

export default function App() {
  return (
      <>
          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/RegisterAdmin" element={<RegisterAdmin/>}/>
              <Route path="/RegisterStudent" element={<RegisterStudent/>}/>
              <Route path="/LoginStudent" element={<LoginStudent/>}/>
              <Route path="/LoginAdmin" element={<LoginAdmin/>}/>
              <Route path="/AboutUs" element={<AboutUs/>}/>
              <Route path="/Profile" element={<Profile/>}/>
              <Route path="/Applyod" element={<Applyod/>}/>
              <Route path="/Lab" element={<Lab/>}/>
              <Route path="/Mentor" element={<Mentor/>}/>
          </Routes>
      </>
  )
}