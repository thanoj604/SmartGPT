import React, { useEffect } from 'react'
import moment from 'moment'
import Markdown from 'react-markdown'
import prism from 'prismjs'
import smartGPT from '../assets/smartgptlogo.gif'

const Message = ({message}) => {

  useEffect(()=>{
    prism.highlightAll()
  }, [message.content])

  return (
    <div className="w-full flex">
  {message.role === "user" ? (
    // User Message (Right-aligned)
    <div className="flex justify-end w-full">
      <div className="flex items-start gap-2 max-w-[80%] md:max-w-lg">
        <div className="flex flex-col gap-1">
          <div className="bg-zinc-950 text-white px-3 py-1.5 rounded-2xl rounded-br-none shadow-lg break-words text-sm md:text-xl">
            <p>{message.content}</p>
          </div>
          <span className="text-xs text-gray-400 self-end">
            {moment(message.timestamp).fromNow()}
          </span>
        </div>
        <i className="ri-user-line w-7 h-7 md:w-14 text-xl md:h-12 text-indigo-400 rounded-full border border-indigo-500 flex justify-center items-center"></i>
      </div>
    </div>
  ) : (
    // AI / Assistant Message (Left-aligned)
    <div className="flex justify-start w-full">
      <div className="flex items-start gap-2 max-w-[90%] md:max-w-5xl">
        <img className="w-15 h-10 text-2xl md:w-19 md:h-15 rounded-full flex justify-center items-center" src={smartGPT} alt="AI" />
        <div className="w-full flex flex-col gap-1">
          {message.isImage ? (
            <img
              src={message.content}
              alt="AI Response"
              className="rounded-2xl shadow-lg mt-1 max-w-full md:max-w-md w-full"
            />
          ) : (
            <div className="bg-zinc-950 text-gray-100 px-3 w-full py-3 rounded-2xl rounded-bl-none shadow-md break-words text-sm md:text-xl">
              <Markdown>{message.content}</Markdown>
            </div>
          )}
          <span className="text-xs text-gray-400">
            {moment(message.timestamp).fromNow()}
          </span>
        </div>
      </div>
    </div>
  )}
</div>



  )
}

export default Message
