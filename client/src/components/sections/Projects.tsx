import { motion } from "framer-motion";
import { resumeData } from "@/data/resume";

export default function Projects() {
  const { projects } = resumeData;
  
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Projects</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              className="project-card bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <img 
                  src={project.image} 
                  className="w-full h-full object-cover" 
                  alt={project.name} 
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.keywords.map((keyword, idx) => (
                    <span 
                      key={idx}
                      className="text-xs px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 rounded-full"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
                  {project.description}
                </p>
                
                {project.url && (
                  <a 
                    href={project.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm"
                  >
                    <span>Learn more</span>
                    <i className="ri-arrow-right-line ml-1"></i>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
