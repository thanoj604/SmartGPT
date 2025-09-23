import React, { useEffect } from 'react'
import moment from 'moment'
import Markdown from 'react-markdown'
import prism from 'prismjs'

const Message = ({message}) => {

  useEffect(()=>{
    prism.highlightAll()
  }, [message.content])

  return (
    <div>
      {message.role === "user" ? (
        <div className='flex flex-col gap-2 p-2 px-4 bg-slate-50'>

          <div>
            <p className='text-sm'>{message.content}</p>
            <span>{moment(message.timestamp).fromNow()}</span>
          </div>

          <i className="ri-user-line w-8 rounded-full"></i>

        </div>
      ): (
        <div className='inline-flex flex-col gap-2 p-2 px-4 max-w-2xl'>

          {message.isImage ? (
            <img src={message.content} alt="" className='w-full max-w-md mt-2'/>
          ): (
            <div className='loader text-sm reset-tw'>
              <Markdown>{message.content}</Markdown>
            </div>
          )}

          <span>{moment(message.timestamp).fromNow()}</span>

        </div>
      )}
    </div>
  )
}

export default Message
