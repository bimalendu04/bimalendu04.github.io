import { useState, useEffect } from "react";
import { Route, Switch } from "wouter";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Animated cursor component
function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  
  // Track if cursor is over a clickable element
  const [isHovering, setIsHovering] = useState(false);

  // Update mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Check if cursor is over a clickable element
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' ||
        !!target.closest('button') ||
        !!target.closest('a') ||
        target.getAttribute('role') === 'button' ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setCursorVariant(isClickable ? "hover" : "default");
      setIsHovering(isClickable);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  // Cursor variants
  const variants = {
    default: {
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
      height: 24,
      width: 24,
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      mixBlendMode: "difference" as "difference",
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        mass: 0.5
      }
    },
    hover: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      mixBlendMode: "difference" as "difference",
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 200,
        mass: 0.6
      }
    }
  };
  
  // Hide cursor on mobile/tablet devices
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Check if device supports hover (non-touch)
    const mediaQuery = window.matchMedia("(hover: hover)");
    setIsVisible(mediaQuery.matches);
    
    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      setIsVisible(e.matches);
    };
    
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => mediaQuery.removeEventListener("change", handleMediaQueryChange);
  }, []);
  
  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className="fixed rounded-full pointer-events-none z-50 flex items-center justify-center"
        variants={variants}
        animate={cursorVariant}
        style={{ 
          boxShadow: isHovering 
            ? "0 0 25px 8px rgba(255, 255, 255, 0.4)" 
            : "0 0 20px 5px rgba(255, 255, 255, 0.3)"
        }}
      >
        <motion.div 
          className="w-2 h-2 bg-transparent rounded-full border border-white"
          animate={{ 
            scale: isHovering ? [0.7, 1.3, 0.7] : [0.5, 1, 0.5],
            opacity: isHovering ? 0.8 : 1
          }}
          transition={{ 
            duration: isHovering ? 1.5 : 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
      </motion.div>
    </>
  );
}

function App() {
  return (
    <div 
      className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 overflow-x-hidden"
    >
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 dark:to-primary/10 pointer-events-none" />
      
      {/* Animated particles */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/20 dark:bg-primary/30"
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              scale: [1, Math.random() * 0.5 + 0.8, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      {/* Custom cursor */}
      <CustomCursor />

      <Header />
      
      <main className="pt-16 relative">
        <AnimatePresence mode="wait">
          <Switch>
            <Route path="/" component={Home} />
            <Route component={NotFound} />
          </Switch>
        </AnimatePresence>
      </main>
      
      <Footer />
      
      {/* Scroll to top button */}
      <motion.button
        className="fixed right-6 bottom-6 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg z-40"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.3 }
        }}
        whileHover={{ 
          scale: 1.1,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        }}
        whileTap={{ scale: 0.95 }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="m18 15-6-6-6 6"/>
        </svg>
      </motion.button>
    </div>
  );
}

export default App;
