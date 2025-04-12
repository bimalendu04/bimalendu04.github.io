import { motion } from "framer-motion";
import { resumeData } from "@/data/resume";

export default function Experience() {
  const { work } = resumeData;
  
  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Experience</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div>
        
        <div className="relative timeline-container pl-8 md:pl-0">
          {work.map((job, index) => {
            // Format date ranges
            const startDate = new Date(job.startDate);
            const endDate = job.endDate ? new Date(job.endDate) : null;
            const dateRange = `${startDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - ${endDate ? endDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}`;
            
            return (
              <motion.div 
                key={index}
                className="mb-12 md:grid md:grid-cols-9"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="md:col-span-3 hidden md:block">
                  <div className="h-full flex items-center justify-end mr-8">
                    <div className="text-right">
                      <h3 className="font-semibold">{dateRange}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{job.company}</p>
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-6 md:border-l-2 md:border-gray-300 dark:md:border-gray-700 md:pl-8 relative">
                  <div className="timeline-dot hidden md:block"></div>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold mb-2">{job.position}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2 md:hidden">{dateRange} | {job.company}</p>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                      {job.highlights.map((highlight, idx) => (
                        <li key={idx}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
