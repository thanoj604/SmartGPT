import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Loading = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/');
    }, 8000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-900 text-white text-2xl">
      <div className="w-10 h-10 rounded-full border-4 border-white border-t-transparent animate-spin"></div>
      <p className="mt-4 text-lg text-gray-300">Loading...</p>
    </div>
  );
};

export default Loading;
