import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import './TextCursor.css';

const TextCursor = ({
  text = '⚛️',
  spacing = 100,
  followMouseDirection = true,
  randomFloat = true,
  exitDuration = 0.5,
  removalInterval = 30,
  maxPoints = 5,
  heroContainerRef = null
}) => {
  const [trail, setTrail] = useState([]);
  const containerRef = useRef(null);
  const lastMoveTimeRef = useRef(Date.now());
  const idCounter = useRef(0);
  const isInHeroRef = useRef(false);

  const handleMouseMove = useCallback(e => {
    if (!containerRef.current) return;
    
    // Check if mouse is within the hero section (if heroContainerRef prop is provided)
    let isInHeroSection = true;
    if (heroContainerRef && heroContainerRef.current) {
      const heroRect = heroContainerRef.current.getBoundingClientRect();
      isInHeroSection = 
        e.clientX >= heroRect.left &&
        e.clientX <= heroRect.right &&
        e.clientY >= heroRect.top &&
        e.clientY <= heroRect.bottom;
      
      // Clear trail if mouse just left the hero section
      if (!isInHeroSection && isInHeroRef.current) {
        setTrail([]);
        isInHeroRef.current = false;
        return;
      }
      
      // Don't create trail points outside hero section
      if (!isInHeroSection) {
        isInHeroRef.current = false;
        return;
      }
      
      isInHeroRef.current = true;
    }
    
    const rect = containerRef.current.getBoundingClientRect();
    // Use getBoundingClientRect for accurate positioning
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const createRandomData = () =>
      randomFloat
        ? {
            randomX: Math.random() * 10 - 5,
            randomY: Math.random() * 10 - 5,
            randomRotate: Math.random() * 10 - 5
          }
        : {};

    setTrail(prev => {
      const newTrail = [...prev];

      if (newTrail.length === 0) {
        newTrail.push({
          id: idCounter.current++,
          x: mouseX,
          y: mouseY,
          angle: 0,
          ...createRandomData()
        });
      } else {
        const last = newTrail[newTrail.length - 1];
        const dx = mouseX - last.x;
        const dy = mouseY - last.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance >= spacing) {
          let rawAngle = (Math.atan2(dy, dx) * 180) / Math.PI;
          const computedAngle = followMouseDirection ? rawAngle : 0;
          const steps = Math.floor(distance / spacing);

          for (let i = 1; i <= steps; i++) {
            const t = (spacing * i) / distance;
            const newX = last.x + dx * t;
            const newY = last.y + dy * t;

            newTrail.push({
              id: idCounter.current++,
              x: newX,
              y: newY,
              angle: computedAngle,
              ...createRandomData()
            });
          }
        }
      }

      return newTrail.length > maxPoints ? newTrail.slice(newTrail.length - maxPoints) : newTrail;
    });

    lastMoveTimeRef.current = Date.now();
  }, [spacing, followMouseDirection, randomFloat, maxPoints, heroContainerRef]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Listen on window but only process if within hero section
    const handleWindowMouseMove = (e) => {
      if (containerRef.current) {
        handleMouseMove(e);
      }
    };

    // Also add mouseleave handler to clear trail when mouse leaves hero section
    const handleMouseLeave = () => {
      if (heroContainerRef && heroContainerRef.current && isInHeroRef.current) {
        setTrail([]);
        isInHeroRef.current = false;
      }
    };

    // Only listen on window to catch mouse movements across the page
    window.addEventListener('mousemove', handleWindowMouseMove);
    
    // Listen for mouse leave on the hero container
    if (heroContainerRef && heroContainerRef.current) {
      heroContainerRef.current.addEventListener('mouseleave', handleMouseLeave);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
      if (heroContainerRef && heroContainerRef.current) {
        heroContainerRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [handleMouseMove, heroContainerRef]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() - lastMoveTimeRef.current > 100) {
        setTrail(prev => (prev.length > 0 ? prev.slice(1) : prev));
      }
    }, removalInterval);
    return () => clearInterval(interval);
  }, [removalInterval]);

  return (
    <div ref={containerRef} className="text-cursor-container">
      <div className="text-cursor-inner">
        <AnimatePresence>
          {trail.map(item => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 1, rotate: item.angle }}
              animate={{
                opacity: 1,
                scale: 1,
                x: randomFloat ? [0, item.randomX || 0, 0] : 0,
                y: randomFloat ? [0, item.randomY || 0, 0] : 0,
                rotate: randomFloat ? [item.angle, item.angle + (item.randomRotate || 0), item.angle] : item.angle
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                opacity: { duration: exitDuration, ease: 'easeOut' },
                ...(randomFloat && {
                  x: { duration: 2, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' },
                  y: { duration: 2, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' },
                  rotate: { duration: 2, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' }
                })
              }}
              className="text-cursor-item"
              style={{ left: item.x, top: item.y }}
            >
              {text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TextCursor;
