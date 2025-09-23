import React, { useContext, useEffect, useRef, useState } from 'react'
import { useAppContext } from '../context/AppContext';
import SmartGPT from '../../public/SmartGPT.png'
import Message from './Message';
import { assets } from '../assets/assets';

const ChatBox = () => {


  const {selectedChat} = useAppContext();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [mode, setMode] = useState('text');
  const [isPublished, setIsPublished] = useState(false);

  const containerRef = useRef(null);

const onSubmit = async (e) => {
  e.preventDefault();
}

  
  useEffect(()=>{

    if(selectedChat){
      setMessages(selectedChat.messages)
    }

  }, [selectedChat])


  useEffect(()=>{

    if(containerRef.current){
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior:"smooth",
      })
    }

  }, [messages])

  return (
    <div className='flex-1 flex flex-col justify-between m-5 md:m-10 max-md:mt-14'>
    
      <div ref={containerRef} className='flex-1 mb-5 overflow-y-scroll'>

        {
          messages.length === 0 && (
            <div className='flex h-screen w-full flex-col justify-center items-center'>
              <img className='h-72' src={SmartGPT} alt="" />
              <p className='mt-5 text-4xl text-center'>Ask me Anything</p>
            </div>
          )
        }

        {messages.map((message, index)=><Message key={index} message={message}/>)}


        {
          loading && <div className='loader flex items-center gap-1.5'>
            <div className='w-1.5 h-1.5 rounded-full bg-gray-500'>
            </div>
            <div className='w-1.5 h-1.5 rounded-full bg-gray-500'>
            </div>
            <div className='w-1.5 h-1.5 rounded-full bg-gray-500'>
            </div>
          </div>
        }
      </div>




      {

        mode === 'image' && (
          <label className='inline-flex items-center gap-2 mb-3 text-sm mx-auto'>
            <p className='text-xs'>Publish to Community</p>
            <input type="checkbox" className='cursor-pointer' checked={isPublished} onChange={(e)=>setIsPublished(e.target.checked)}/>
          </label>
        )

      }  




      <form onSubmit={onSubmit} className='w-full max-w-2xl p-3 pl-4 mx-auto flex gap-4 items-center'>

        <select onChange={(e)=>setMode(e.target.value)} value={mode} className='text-sm pl-3 pr-2 outline-none'>
          <option value="text">Text</option>
          <option value="image">Image</option>
        </select>

        <input onChange={(e)=>setPrompt(e.target.value)} value={prompt} className='flex-1 w-full text-sm outline-none' type="text" placeholder='Type Your Prompt...' required />

        <button disabled={loading}>
          <img src={loading ? assets.stop_icon : assets.send_icon} className='w-8 cursor-pointer' alt="" />
        </button>


      </form>

    </div>
  )
}

export default ChatBox
