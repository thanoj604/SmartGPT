import { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ChatBox from "./components/ChatBox";
import Community from "./pages/Community";
import SideBar from "./components/SideBar";
import './assets/prism.css';
import Loading from "./pages/Loading";
import { useAppContext } from "./context/AppContext";
import Login from "./pages/Login";
import {Toaster} from 'react-hot-toast'

function App() {

  const {user, loadingUser} = useAppContext()


  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {pathname} = useLocation()

  if(pathname === '/loading' || loadingUser) return <Loading/>

  return (

    <>
    <Toaster />
    {!isMenuOpen && <i className="p-5 ri-menu-line absolute z-10 text-white text-2xl" onClick={()=>setIsMenuOpen(true)}></i>}

    {user ? (

      <div className="flex h-screen w-full bg-gray-900" >
      
      <SideBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <Routes>
        <Route path="/" element={<ChatBox />} />
        <Route path="/community" element={<Community />} />
      </Routes>
    </div>


    ): (
      <div className="flex items-center justify-center h-screen w-screen">
        <Login />
      </div>
    )}

    

    </>
  );
}

export default App;
