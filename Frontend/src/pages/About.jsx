import React from "react";
import myPic from '../assets/MyPic.png'
import { useNavigate } from "react-router-dom";

const About = () => {

    const navigate = useNavigate();

  return (
    <section className="bg-black-950 flex flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-8 w-full overflow-auto md:overflow-hidden">


      <div className="mt-20 mb-3">
        <button onClick={()=>navigate("/")} className="right-0 bg-white text-2xl outline-none px-5 py-2 flex justify-center items-center rounded-full gap-2 hover:bg-blue-400 hover:text-white transition-all duration-200 cursor-pointer"><i className=" text-2xl  ri-arrow-left-long-line"></i><span>Back</span></button>
      </div>
        
      <div className=" h-screen text-white bg-black shadow-2xl rounded-2xl p-8 sm:p-12">
        {/* Profile Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-8 text-center md:text-left">
          {/* Image */}
          <img
            src={myPic}
            alt="Your Name"
            className="w-50 h-60 md:w-70 md:h-60 rounded-full object-cover shadow-md mb-6 md:mb-0"
          />

          {/* Details */}
          <div>
            <h1 className="text-3xl font-bold mb-2">Thanoj Sriman</h1>
            <h2 className="text-lg text-gray-200 font-semibold mb-4">
              Full Stack Developer | React | MERN | JAVA
            </h2>

            <p className="leading-relaxed mb-6">
              Welcome to my project! 🚀  
              This project showcases my passion for web development and problem-solving.
              I built it using modern technologies like <span className="font-semibold">React, Tailwind CSS, and Node.js</span>.
              The goal is to create something simple, elegant, and impactful — combining functionality with clean design.
            </p>

            <p className="leading-relaxed">
              I'm a passionate developer who loves building real-world applications that
              make daily life easier. Whether it’s designing responsive UIs, optimizing
              performance, or experimenting with new frameworks, I’m always up for a challenge.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-8"></div>

        {/* Project Details */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">About the Project</h3>
          <p className="mb-4">
            This project is an advanced AI Chatbot Web Application built using the MERN stack (MongoDB, Express, React, Node.js).
            It’s designed to deliver a modern, interactive, and responsive experience allowing users to chat naturally with AI and even generate stunning AI-powered images.

            Beyond chatting, users can share their generated creations with the community through a dedicated ADD TO COMMUNITY feature, turning the platform in  to a creative social space where everyone can explore and get inspired by others’ work.

            The interface is sleek, minimal, and optimized for all screen sizes, making it smooth and enjoyable to use whether you’re on desktop or mobile.
            
            It’s not just a chatbot — it’s a fun, creative, and collaborative AI experience that combines communication, imagination, and community all in one place. 🚀
          </p>
          <p>
            Feel free to explore the project and check out the source code or my other works below!
          </p>
        </div>

        {/* Links Section */}
        <div className="mt-10 flex flex-col w-full items-center justify-center gap-4">
          <div className="flex flex-wrap justify-center sm:justify-start gap-4">
            <a
              href="https://github.com/thanoj604?tab=repositories"
              target="_blank"
              rel="github"
              className="hover:scale-110 transition-all duration-200"
            >
              <i className="text-5xl ri-github-fill"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/d-thanoj-sriman/"
              target="_blank"
              rel="linkedin"
              className="hover:scale-110 transition-all duration-200"
            >
              <i className="text-5xl ri-linkedin-box-fill"></i>
            </a>
            <a
              href="mailto:thanojsriman085@gmail.com"
              className="hover:scale-110 transition-all duration-200"
            >
              <i className="text-5xl ri-mail-fill"></i>
            </a>
          </div>

          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Thanoj Sriman. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
