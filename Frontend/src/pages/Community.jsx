import React, { useEffect, useState } from 'react'
import { dummyPublishedImages } from '../assets/assets'
import Loading from './Loading'

const Community = () => {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchImages = async () => {
    setImages(dummyPublishedImages)
    setLoading(false)
  }

  useEffect(() => {
    fetchImages()
  }, [])

  if (loading) return <Loading />

  return (
    <div className='p-6 pt-12 xl:px-12 2xl:px-20 w-full mx-auto h-full overflow-y-scroll'>
      <h2>Community Images</h2>

      {images.length > 0 ? (
        <div className='flex flex-wrap max-sm:justify-center gap-5'>
          {images.map((item, index) => (
            <a
              key={index}
              href={item.imageUrl}
              target='_blank'
              rel='noreferrer'
              className='relative group block rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow duration-300'
            >
              <img src={item.imageUrl} alt="" className='w-full h-40 md:h-50' />
              <p>created by {item.userName}</p>
            </a>
          ))}
        </div>
      ) : (
        <p className='text-center text-gray-600'>No Images Available...</p>
      )}
    </div>
  )
}

export default Community
