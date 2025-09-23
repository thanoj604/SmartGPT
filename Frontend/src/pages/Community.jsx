import React, { useEffect, useState } from 'react'
import { dummyPublishedImages } from '../assets/assets'
import Loading from './Loading'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Community = () => {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)

  const {axios} = useAppContext()

  const fetchImages = async () => {
    try {
      const {data} = await axios.get('/api/user/published-images')

      if(data.success){
        setImages(data.images)
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {

      toast.error(error.message)
      
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchImages()
  }, [])

  if (loading) return <Loading />

  return (
    <div className="p-6 pt-12 xl:px-12 2xl:px-20 w-full mx-auto h-full overflow-y-scroll bg-gray-900 text-gray-200">
  <h2 className="text-2xl font-semibold mb-6 text-indigo-400">
    Community Images
  </h2>

  {images.length > 0 ? (
    <div className="flex flex-wrap max-sm:justify-center gap-6">
      {images.map((item, index) => (
        <a
          key={index}
          href={item.imageUrl}
          target="_blank"
          rel="noreferrer"
          className="relative group block rounded-xl overflow-hidden 
                     border border-gray-700 bg-gray-800 shadow-md hover:shadow-xl 
                     transition-all duration-300 w-72"
        >
          {/* Image */}
          <div className="overflow-hidden">
            <img
              src={item.imageUrl}
              alt="Community Upload"
              className="w-full h-48 object-cover transform group-hover:scale-105 transition duration-500"
            />
          </div>

          {/* Overlay info */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
            <p className="text-sm text-gray-100 bg-gray-900/70 px-3 py-1 rounded-md">
              Click to view full size
            </p>
          </div>

          {/* Footer */}
          <div className="p-3 bg-gray-900/80 border-t border-gray-700 text-md text-gray-400">
            <p>
              Created by <span className="text-indigo-400 text-md">{item.userName}</span>
            </p>
          </div>
        </a>
      ))}
    </div>
  ) : (
    <p className="text-center text-gray-500">No Images Available...</p>
  )}
</div>

  )
}

export default Community
