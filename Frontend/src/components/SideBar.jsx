import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import smartgptlogo from "../assets/smartgptlogo.png"
import moment from "moment";
import toast from "react-hot-toast";
import Loading from "../pages/Loading";

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
    <div className={`flex flex-col items-center h-screen min-w-72 p-5 transition-all duration-500 relative max-md:absolute left-0 z-20 bg-gray-900 text-gray-100 ${!isMenuOpen && 'max-md:-translate-x-full'}`}>
  
 
  <img src={smartgptlogo} alt="No Image" className="w-full max-w-48 mb-6" />

 
  <button
    onClick={createNewChat}
    className="flex justify-center items-center cursor-pointer w-full py-2 mb-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md transition"
  >
    <span className="mr-2 text-xl ">+</span> New Chat
  </button>

 
  <div className="flex items-center gap-2 p-2 mb-4 bg-gray-800 rounded-lg">
    <i className="ri-search-2-line text-gray-400"></i>
    <input
      className="flex-1 bg-transparent outline-none text-gray-200 placeholder-gray-400"
      onChange={(e) => setSearch(e.target.value)}
      value={search}
      type="text"
      placeholder="Search Conversations"
    />
  </div>


  {chats.length > 0 && <p className="mt-2 mb-2 text-md text-gray-400">Recent Chats</p>}
  <div className="flex-1 w-full overflow-y-scroll space-y-3 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
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
          className="p-2 px-4 flex justify-between items-center rounded-lg cursor-pointer border border-gray-700 hover:bg-gray-800 transition group"
        >
          <div>
            <p className="truncate">
              {chat.messages.length > 0 ? chat.messages[0].content.slice(0, 32) : chat.name}
            </p>
            <p className="text-xs text-gray-500">
              {moment(chat.updatedAt).fromNow()}
            </p>
          </div>
          <i
  className="ri-delete-bin-2-line hidden group-hover:inline-block ml-2 text-2xl text-red-400 cursor-pointer"
  onClick={(e) => toast.promise(deleteChat(e, chat._id), { loading: "Deleting..." })}
/>

        </div>
      ))}
  </div>

  <div
    onClick={() => { navigate("/community"); setIsMenuOpen(false); }}
    className="flex w-full items-center gap-2 mt-4 p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition"
  >
    <i className="ri-multi-image-line text-xl text-indigo-400"></i>
    <div className="flex flex-col text-sm">
      <p>Community Images</p>
    </div>
  </div>


  
  <div className="flex items-center w-full gap-2 mt-4 p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition group">
  <i className="ri-user-line w-7 h-7 rounded-full border border-gray-600 flex justify-center items-center text-gray-400"></i>
  <div className="flex justify-between items-center text-sm flex-1">
    <p className="truncate">{user ? user.name : "Login to your Account"}</p>
    {user && (
      <i
        onClick={logout}
        className="ri-logout-box-line hidden group-hover:block text-red-500 cursor-pointer text-xl"
      ></i>
    )}
  </div>
</div>

<i
  onClick={() => setIsMenuOpen(false)}
  className="ri-close-fill absolute top-3 right-3 w-5 h-5 cursor-pointer md:hidden text-gray-400 hover:text-gray-200 transition"
></i>


</div>

  );
};

export default SideBar;
