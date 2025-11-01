import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import smartgptlogo from "../assets/smartGPT.gif"
import moment from "moment";
import toast from "react-hot-toast";
import Loading from "../pages/Loading";
import { Link } from "react-router-dom";

const SideBar = ({isMenuOpen, setIsMenuOpen}) => {
  const { chats, setSelectedChat, user, navigate, createNewChat, axios, setChats, fetchUsersChats, setToken, token } = useAppContext();

  const [search, setSearch] = useState("");

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    toast.success('Logged out Successfully')
  }


  const deleteChat = async (e, chatId) => {
    try {
      e.stopPropagation()
      const confirm = window.confirm("Do you really want to Delete this Chat?")
      
      if(!confirm) return

      const {data} = await axios.post('/api/chat/delete', {chatId}, {
        headers:{Authorization:token}
      })

      if(data.success){
        setChats(prev => prev.filter(chat => chat._id != chatId))

        await fetchUsersChats()
        toast.success(data.message)
      }

    } catch (error) {

      toast.error(error.message)
      
    }
  } 


  return (
    <div className={`flex flex-col items-center h-screen min-w-[16rem] p-4 sm:p-5 transition-all duration-500 relative max-md:absolute left-0 z-20 bg-black text-gray-100 ${!isMenuOpen && 'max-md:-translate-x-full'}`}>

  {/* Logo */}
  <img src={smartgptlogo} alt="SmartGPT Logo" className="w-full rounded-full max-w-40 sm:max-w-48 mb-4 sm:mb-6" />

  {/* New Chat Button */}
  <button
    onClick={createNewChat}
    className="flex justify-center items-center w-full py-2 mb-3 sm:mb-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md text-sm sm:text-base transition"
  >
    <span className="mr-2 text-lg sm:text-xl">+</span> New Chat
  </button>

  {/* Search Box */}
  <div className="flex items-center gap-2 p-2 mb-3 sm:mb-4 bg-gray-800 rounded-lg w-full">
    <i className="ri-search-2-line text-gray-400"></i>
    <input
      className="flex-1 bg-transparent outline-none text-gray-200 placeholder-gray-400 text-sm sm:text-base"
      onChange={(e) => setSearch(e.target.value)}
      value={search}
      type="text"
      placeholder="Search Conversations"
    />
  </div>

  {/* Recent Chats */}
  {chats.length > 0 && <p className="mt-1 mb-2 text-sm sm:text-md text-gray-400 w-full">Recent Chats</p>}
  <div className="flex-1 w-full overflow-y-auto space-y-2 sm:space-y-3 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
    {chats
      .filter((chat) =>
        chat.messages[0]
          ? chat.messages[0].content.toLowerCase().includes(search.toLowerCase())
          : chat.name.toLowerCase().includes(search.toLowerCase())
      )
      .map((chat) => (
        <div
          onClick={() => { navigate("/"); setSelectedChat(chat); setIsMenuOpen(false); }}
          key={chat._id}
          className="p-2 px-3 sm:px-4 flex justify-between items-center rounded-lg cursor-pointer border border-gray-700 hover:bg-gray-800 transition group text-sm sm:text-base"
        >
          <div>
            <p className="truncate">
              {chat.messages.length > 0 ? chat.messages[0].content.slice(0, 20) : chat.name}
            </p>
            <p className="text-xs text-gray-500">
              {moment(chat.updatedAt).fromNow()}
            </p>
          </div>
          <i
            className="ri-delete-bin-2-line ml-2 text-lg sm:text-2xl text-red-400 cursor-pointer inline-block md:hidden group-hover:inline-block"

            onClick={(e) => toast.promise(deleteChat(e, chat._id), { loading: "Deleting..." })}
          />
        </div>
      ))}
  </div>

  {/* Community Images */}
  <div
    onClick={() => { navigate("/community"); setIsMenuOpen(false); }}
    className="flex w-full items-center gap-2 mt-3 sm:mt-4 p-3 sm:p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition text-sm sm:text-base"
  >
    <i className="ri-multi-image-line text-lg sm:text-xl text-indigo-400"></i>
    <div className="flex flex-col">
      <p>Community Images</p>
    </div>
  </div>

  {/* User Info / Logout */}
  <div className="flex items-center w-full gap-2 mt-3 sm:mt-4 p-3 sm:p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition group text-sm sm:text-base">
    <i className="ri-user-line w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-gray-600 flex justify-center items-center text-gray-400"></i>
    <div className="flex justify-between items-center flex-1">
      <p className="truncate">{user ? user.name : "Login to your Account"}</p>
      {user && (
        <i
          onClick={logout}
          className="ri-logout-box-line ml-2 text-lg sm:text-xl text-red-400 cursor-pointer inline-block md:hidden group-hover:inline-block"
        ></i>
      )}
    </div>
  </div>

  <Link to="/about" onClick={()=>setShowAbout(true)} className="flex justify-start items-center w-full gap-2 mt-3 sm:mt-4 p-3 sm:p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition group text-sm sm:text-base">

    About me 

  </Link>

  {/* Close Button for Mobile */}
  <i
    onClick={() => setIsMenuOpen(false)}
    className="text-2xl ri-close-fill absolute top-2 sm:top-3 right-2 sm:right-3 w-5 h-5 cursor-pointer md:hidden text-white hover:text-gray-200 transition"
  ></i>

</div>


  );
};

export default SideBar;
