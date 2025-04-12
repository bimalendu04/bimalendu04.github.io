import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { resumeData } from "@/data/resume";

export default function Hero() {
  const { basics } = resumeData;
  
  return (
    <section id="home" className="min-h-screen flex items-center pt-10 pb-20">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center">
        <motion.div 
          className="md:w-1/2 mb-10 md:mb-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Hi, I'm <span className="text-primary">{basics.name.split(' ')[0]}</span>
          </h1>
          <h2 className="text-2xl md:text-3xl mb-6 text-gray-700 dark:text-gray-300">
            {basics.label}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-lg">
            {basics.summary}
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#contact">
              <Button size="lg" className="gap-2">
                <i className="ri-mail-line"></i> Contact Me
              </Button>
            </a>
            <a href="#projects">
              <Button variant="outline" size="lg" className="gap-2">
                <i className="ri-folder-line"></i> View Projects
              </Button>
            </a>
          </div>
          <div className="flex gap-4 mt-8">
            {basics.profiles.map((profile, index) => (
              <a 
                key={index}
                href={profile.url} 
                target="_blank" 
                rel="noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-400 transition-colors duration-300"
              >
                <i className={`${profile.icon} text-3xl`}></i>
              </a>
            ))}
          </div>
        </motion.div>
        <motion.div 
          className="md:w-1/2 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative">
            <div className="w-64 h-64 md:w-80 md:h-80 bg-primary-100 dark:bg-primary-900/20 rounded-full absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 filter blur-xl opacity-70"></div>
            <img 
              src="https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
              alt="Professional workspace with computer" 
              className="rounded-2xl shadow-lg relative z-10 w-full max-w-md" 
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
