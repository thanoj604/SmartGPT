import React, { useContext, useEffect, useRef, useState } from "react";
import { useAppContext } from "../context/AppContext";
import SmartGPT from "../assets/smartGPT.gif";
import Message from "./Message";
import { assets } from "../assets/assets";
import loadingLogo from '../assets/loading.gif'
import toast from "react-hot-toast";

const ChatBox = () => {
  const { selectedChat, user, axios, token, setUser } = useAppContext();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [mode, setMode] = useState("text");
  const [isPublished, setIsPublished] = useState(false);

  const containerRef = useRef(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!user) return toast("Login to send a message");

    if (!selectedChat?._id) {
      return toast.error("Please select a chat first");
    }

    const promptCopy = prompt.trim();
    if (!promptCopy) return; // block empty messages

    setLoading(true);
    setPrompt("");

    try {
      // Optimistically show user message
      setMessages((prev) => [
        ...prev,
        {
          role: "user",
          content: promptCopy,
          timestamp: Date.now(),
          isImage: false,
        },
      ]);

      const { data } = await axios.post(
        `/api/message/${mode}`,
        { chatId: selectedChat._id, prompt: promptCopy, isPublished },
        { headers: { Authorization: token } }
      );

      if (data.success) {
        setMessages((prev) => [...prev, data.reply]);
      } else {
        toast.error(data.message || "Something went wrong");
        setPrompt(promptCopy);
      }
    } catch (error) {
      toast.error(error.message || "Request failed");
      setPrompt(promptCopy);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat.messages);
    }
  }, [selectedChat]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (

//     <div className="flex-1 flex flex-col justify-between m-5 md:m-10 max-md:mt-14 bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
//   {/* Messages Container */}
//   <div
//     ref={containerRef}
//     className="flex-1 p-5 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800 bg-gray-800 rounded-t-2xl"
//   >
//     {messages.length === 0 && (
//       <div className="flex flex-col justify-center items-center h-full">
//         <img
//           className="h-64 md:h-72 animate-bounce rounded-full"
//           src={SmartGPT}
//           alt="SmartGPT"
//         />
//         <p className="mt-5 text-3xl md:text-4xl font-semibold text-gray-300 text-center">
//           <p>Hello {user.name}, how can i help you?</p>
//         </p>
//       </div>
//     )}

//     {messages.map((message, index) => (
//       <Message key={index} message={message} darkMode />
//     ))}

//     {loading && (
//   <div className="flex items-center justify-center gap-2 mt-2">
//     <span className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce shadow-lg shadow-indigo-500/50"></span>
//     <span className="w-3 h-3 bg-indigo-400 rounded-full animate-bounce delay-250 shadow-lg shadow-indigo-400/50"></span>
//     <span className="w-3 h-3 bg-indigo-300 rounded-full animate-bounce delay-600 shadow-lg shadow-indigo-300/50"></span>
//   </div>
// )}


//   </div>

//   {/* Publish Toggle */}
//   {mode === "image" && (
//     <label className="flex items-center gap-2 px-5 py-2 bg-gray-700 text-sm text-gray-200 font-medium mx-auto mt-3 rounded-lg cursor-pointer hover:bg-gray-600 transition">
//       <input
//         type="checkbox"
//         className="cursor-pointer"
//         checked={isPublished}
//         onChange={(e) => setIsPublished(e.target.checked)}
//       />
//       <span className="text-xs">Publish to Community</span>
//     </label>
//   )}

//   {/* Input Form */}
//   <form
//   onSubmit={onSubmit}
//   className="w-full flex items-center justify-center gap-3 p-4 bg-gray-900 border-t border-gray-700 shadow-inner rounded-b-2xl max-w-4xl mx-auto sticky bottom-0 backdrop-blur-md"
// >
//   {/* Mode Selector */}
//   <select
//     value={mode}
//     onChange={(e) => setMode(e.target.value)}
//     className="text-md px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-gray-200 hover:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
//   >
//     <option value="text">Text</option>
//     <option value="image">Image</option>
//   </select>

//   {/* Prompt Input */}
//   <input
//     type="text"
//     placeholder="Type your prompt..."
//     value={prompt}
//     onChange={(e) => setPrompt(e.target.value)}
//     className=" w-full flex-1 text-md px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm"
//     required
//   />

//   {/* Submit Button */}
//   <button
//     type="submit"
//     disabled={loading}
//     className="w-10 h-10 flex justify-center items-center bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white rounded-full transition-shadow shadow-md hover:shadow-lg disabled:opacity-50"
//   >
//     <button
//   type="submit"
//   disabled={loading}
//   className="w-10 h-10 flex justify-center items-center bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white rounded-full transition-shadow shadow-md hover:shadow-lg disabled:opacity-50"
// >
//   {loading ? (
//     <i className="ri-loader-4-line w-6 h-6 animate-spin text-white"></i> // spinning loader icon
//   ) : (
//     <i className="ri-send-plane-2-fill w-6 h-6"></i> // send icon
//   )}
// </button>


//   </button>
// </form>

// </div>


<div className="flex-1 flex flex-col justify-between m-3 md:m-8 max-md:mt-14 bg-black-900 rounded-2xl shadow-xl overflow-hidden">
  {/* Messages Container */}
  <div
    ref={containerRef}
    className="flex-1 p-3 md:p-5 overflow-y-auto space-y-3 md:space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800 bg-black rounded-t-2xl"
  >
    {messages.length === 0 && (
      <div className="flex flex-col justify-center items-center h-full">
        <img
          className="h-48 md:h-64 rounded-full"
          src={SmartGPT}
          alt="SmartGPT"
        />
        <p className="mt-4 text-xl md:text-2xl font-semibold text-gray-300 text-center">
          Hello {user.name}, how can I help you?
        </p>
      </div>
    )}

    {messages.map((message, index) => (
      <Message key={index} message={message} darkMode />
    ))}

    {loading && (
      <div className="flex flex-col items-center justify-center mt-2">
        <img className="w-xl h-96 md:w-xl md:h-96" src={loadingLogo} alt="Let me Think" />
        <span class="text-3xl font-bold text-white drop-shadow-[0_0_10px_#fffff] animate-pulse duration-[5000ms]">
          Thinking....
        </span>
      </div>
    )}
  </div>

  {/* Publish Toggle */}
  {mode === "image" && (
    <label className="flex items-center gap-2 px-4 py-2 bg-black text-xs md:text-sm text-gray-200 font-medium mx-auto mt-3 rounded-lg cursor-pointer hover:bg-gray-600 transition">
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={isPublished}
        onChange={(e) => setIsPublished(e.target.checked)}
      />
      <span>Publish to Community</span>
    </label>
  )}

  {/* Input Form */}
  <form
    onSubmit={onSubmit}
    className="w-full flex flex-col sm:flex-row items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-zinc-950 shadow-inner rounded-b-2xl max-w-4xl mx-auto sticky bottom-0 backdrop-blur-md"
  >
    {/* Mode Selector */}
    <select
      value={mode}
      onChange={(e) => setMode(e.target.value)}
      className="text-md md:text-md px-3 md:px-5 py-2 md:py-3 border border-gray-600 rounded-lg bg-gray-800 text-gray-200 hover:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
    >
      <option className="p-2" value="text">Text</option>
      <option className="p-2" value="image">Image</option>
    </select>

    {/* Prompt Input */}
    <input
      type="text"
      placeholder="Type your prompt..."
      value={prompt}
      onChange={(e) => setPrompt(e.target.value)}
      className="w-full flex-1 text-md md:text-md px-4 md:px-5 py-3 border border-indigo-500 outline-none rounded-lg bg-zinc-920 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm"
      required
    />

    {/* Submit Button */}
    <button
      type="submit"
      disabled={loading}
      className="w-12 h-12 flex justify-center items-center bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white rounded-full transition-shadow shadow-md hover:shadow-lg disabled:opacity-50"
    >
      {loading ? (
        <i className="ri-loader-4-line w-5 h-5 animate-spin text-white"></i> 
      ) : (
        <i className="ri-send-plane-2-fill w-5 h-5"></i> 
      )}
    </button>
  </form>
</div>


  );
};

export default ChatBox;
