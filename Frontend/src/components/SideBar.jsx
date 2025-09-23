import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import moment from "moment";

const SideBar = ({isMenuOpen, setIsMenuOpen}) => {
  const { chats, setSelectedChat, user, navigate } = useAppContext();

  const [search, setSearch] = useState("");

  return (
    <div className={`flex flex-col h-screen min-w-72 p-5 border transition-all duration-500 relative max-md:absolute left-0 z-1 ${!isMenuOpen && 'max-md:-translate-x-full'}`}>
      <img src={assets.logo_full} alt="No Image" className="w-full max-w-48" />

      <button className="flex justify-center items-center w-full py-2 mt-10">
        <span className="mr-2 text-xl">+</span> New Chat
      </button>

      <div className="flex items-center gap-2 p-1 mt-4 border">
        <i className="ri-search-2-line "></i>
        <input
          className="outline-none"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          type="text"
          placeholder="Search Conversations"
        />
      </div>

      {chats.length > 0 && <p className="mt-4 text-sm">Recent Chats</p>}
      <div className="flex-1 overflow-y-scroll mt-3 text-sm space-y-3">
        {chats
          .filter((chat) =>
            chat.messages[0]
              ? chat.messages[0].content
                  .toLowerCase()
                  .includes(search.toLowerCase())
              : chat.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((chat) => {
            return (
              <div
                onClick={()=>{navigate("/"); setSelectedChat(chat); setIsMenuOpen(false)}}
                key={chat._id}
                className="p-2 px-4 group rounded-lg flex justify-between border"
              >
                <div>
                  <p>
                    {chat.messages.length > 0
                      ? chat.messages[0].content.slice(0, 32)
                      : chat.name}
                  </p>

                  <p className="text-xs text-gray-500">
                    {moment(chat.updatedAt).fromNow()}
                  </p>
                </div>
                <i className="ri-delete-bin-2-line hidden group-hover:block text-xl"></i>
              </div>
            );
          })}
      </div>

      <div
        onClick={() => {
          navigate("/community");
          setIsMenuOpen(false);
        }}
        className="flex items-center gap-2 mt-4 border rounded-lg cursor-pointer p-4"
      >
        <i className="ri-multi-image-line text-xl"></i>
        <div className="flex flex-col text-sm">
          <p>Community Images</p>
        </div>
      </div>

      <div
        onClick={() => {
          navigate("/credits");
          setIsMenuOpen(false);
        }}
        className="flex items-center gap-2 mt-4 border rounded-lg cursor-pointer p-4"
      >
        <i className="ri-diamond-line text-xl"></i>
        <div className="flex flex-col text-sm">
          <p>Credits : {user?.credits}</p>
          <p>Purchase credits to use SmartGPT</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4 border rounded-lg cursor-pointer p-4 group">
        <i className="ri-user-line w-7 rounded-full"></i>
        <div className="flex justify-between text-sm">
          <p className="flex-1 text-sm truncate">
            {user ? user.name : "Login to your Account"}
          </p>
          
          
        </div>
        <div>

            {user && (
            <i className="ri-logout-box-line hidden group-hover:block"></i>
          )}

          </div>
      </div>

      <i onClick={()=>setIsMenuOpen(false)} className="ri-close-fill absolute top-3 right-3 w-5 h-5 cursor-pointer md:hidden"></i>

    </div>
  );
};

export default SideBar;
