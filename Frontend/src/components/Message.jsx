import React, { useEffect } from 'react'
import moment from 'moment'
import Markdown from 'react-markdown'
import prism from 'prismjs'

const Message = ({message}) => {

  useEffect(()=>{
    prism.highlightAll()
  }, [message.content])

  return (
    <div className="w-full flex">
  {message.role === "user" ? (
    // User Message (Right-aligned)
    <div className="flex justify-end w-full">
      <div className="flex items-end gap-2 max-w-[80%] md:max-w-md">
        <div className="flex flex-col gap-1">
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-400 text-white px-3 py-1.5 rounded-2xl rounded-br-none shadow-lg break-words text-sm md:text-base">
            <p>{message.content}</p>
          </div>
          <span className="text-xs text-gray-400 self-end">
            {moment(message.timestamp).fromNow()}
          </span>
        </div>
        <i className="ri-user-line w-10 h-10 md:w-12 md:h-12 text-indigo-400 rounded-full border border-indigo-500 flex justify-center items-center"></i>
      </div>
    </div>
  ) : (
    // AI / Assistant Message (Left-aligned)
    <div className="flex justify-start w-full">
      <div className="flex items-end gap-2 max-w-[80%] md:max-w-2xl">
        <i className="ri-robot-3-line w-10 h-10 md:w-12 md:h-12 text-gray-400 rounded-full border border-gray-600 flex justify-center items-center"></i>
        <div className="flex flex-col gap-1">
          {message.isImage ? (
            <img
              src={message.content}
              alt="AI Response"
              className="rounded-2xl shadow-lg mt-1 max-w-full md:max-w-md w-full"
            />
          ) : (
            <div className="bg-gray-700 text-gray-100 px-3 py-1.5 rounded-2xl rounded-bl-none shadow-md break-words text-sm md:text-base">
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
