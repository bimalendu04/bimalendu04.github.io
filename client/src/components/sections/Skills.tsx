import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { resumeData } from "@/data/resume";

export default function Skills() {
  const { skills } = resumeData;
  
  // Group skills by category
  const frontend = skills.filter(skill => skill.category === "Frontend");
  const libraries = skills.filter(skill => skill.category === "Libraries & State");
  const tools = skills.filter(skill => skill.category === "Tools & Platforms");
  const testing = skills.filter(skill => skill.category === "Testing");
  const methodologies = skills.filter(skill => skill.category === "Methodologies");
  
  const skillsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(skillsRef, { once: true, margin: "-100px" });
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const skillVariants = {
    hidden: { width: 0 },
    show: (level: number) => ({
      width: `${level}%`,
      transition: { 
        duration: 1,
        ease: "easeOut"
      }
    })
  };

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Skills</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div>
        
        <div ref={skillsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Frontend Technologies */}
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 mr-4">
                <i className="ri-code-s-slash-line text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold">Frontend</h3>
            </div>
            
            <div className="space-y-4">
              {frontend.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-primary rounded-full"
                      custom={skill.level}
                      variants={skillVariants}
                      initial="hidden"
                      animate={isInView ? "show" : "hidden"}
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* State Management & UI Libraries */}
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-lg bg-secondary-100 dark:bg-secondary-900/30 flex items-center justify-center text-secondary-600 dark:text-secondary-400 mr-4">
                <i className="ri-layout-masonry-line text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold">Libraries & State</h3>
            </div>
            
            <div className="space-y-4">
              {libraries.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-secondary-500 rounded-full"
                      custom={skill.level}
                      variants={skillVariants}
                      initial="hidden"
                      animate={isInView ? "show" : "hidden"}
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Tools & Platforms */}
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-lg bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center text-accent-600 dark:text-accent-400 mr-4">
                <i className="ri-tools-line text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold">Tools & Platforms</h3>
            </div>
            
            <div className="space-y-4">
              {tools.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-accent-500 rounded-full"
                      custom={skill.level}
                      variants={skillVariants}
                      initial="hidden"
                      animate={isInView ? "show" : "hidden"}
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Testing Frameworks */}
        <motion.div 
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-xl font-semibold mb-4">Testing Frameworks</h3>
          <div className="flex flex-wrap gap-3">
            {testing.map((skill, index) => (
              <span key={index} className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-800 dark:text-gray-200">
                {skill.name}
              </span>
            ))}
          </div>
        </motion.div>
        
        {/* Methodologies */}
        <motion.div 
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold mb-4">Methodologies</h3>
          <div className="flex flex-wrap gap-3">
            {methodologies.map((skill, index) => (
              <span key={index} className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-800 dark:text-gray-200">
                {skill.name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
