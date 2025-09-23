import { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ChatBox from "./components/ChatBox";
import Credits from "./pages/Credits";
import Community from "./pages/Community";
import SideBar from "./components/SideBar";
import './assets/prism.css';
import Loading from "./pages/Loading";
import { useAppContext } from "./context/AppContext";
import Login from "./pages/Login";

function App() {

  const {user} = useAppContext()


  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {pathname} = useLocation()

  if(pathname === '/loading') return <Loading/>

  return (

    <>
    {!isMenuOpen && <i className="ri-menu-line absolute z-1" onClick={()=>setIsMenuOpen(true)}></i>}

    {user ? (

      <div className="flex h-screen w-full" >
      
      <SideBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <Routes>
        <Route path="/" element={<ChatBox />} />
        <Route path="/credits" element={<Credits />} />
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
