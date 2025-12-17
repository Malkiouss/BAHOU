import React, { useRef, useEffect, useState } from 'react';
import './hero.css';
import handDrawnIllustration from './hand-drawn-poetry-illustration.png';
import TextCursor from './TextCursor';
import gsap from 'gsap';




export default function Hero() {
    
    const [isLoading, setIsLoading] = useState(true);
    const loader = useRef(null);
    const startRef = useRef(null);
    const duration = 600;
    const illustrationRef = useRef(null);
    const mousePosition = useRef({ x: 0, y: 0 });
    const currentPosition = useRef({ x: 0, y: 0 });
    const animationFrameId = useRef(null);

    const easeOutQuad = (time, start, end, duration) => {
        return -end * (time /= duration) * (time - 2) + start;
    };

    const loaderHeight = () => {
        if (loader.current) {
            const loaderBounds = loader.current.getBoundingClientRect();
            return loaderBounds.height;
        }
        return window.innerHeight;
    };

    

    useEffect(() => {
          
        gsap.fromTo(
            ".headline ,.subtitle",
            { letterSpacing: "0.5em", opacity: 0 },
            { letterSpacing: "0.04em", opacity: 1, duration: 4, ease: "power3.out" }
          );


        const animate = (timestamp) => {
            if (startRef.current === null) {
                startRef.current = timestamp;
            }
            const elapsed = timestamp - startRef.current;

            if (loader.current) {
                // Vertical movement with easing - slides up
                const verticalOffset = easeOutQuad(elapsed, 0, -loaderHeight(), duration);
                loader.current.style.top = verticalOffset + "px";
            }

            if (elapsed < duration) {
                requestAnimationFrame(animate);
            } else {
                // Animation complete
                if (loader.current) {
                    loader.current.style.display = 'none';
                }
                setIsLoading(false);
            }
        };

        if (loader.current) {
            setTimeout(() => {
                startRef.current = null;
                requestAnimationFrame(animate);
            }, 500);
        }
    }, []);

    // Smooth cursor following animation
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (illustrationRef.current) {
                const rect = illustrationRef.current.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                // Calculate offset from center
                const offsetX = (e.clientX - centerX) * 0.1; // 10% movement for subtle effect
                const offsetY = (e.clientY - centerY) * 0.1;
                
                mousePosition.current = { x: offsetX, y: offsetY };
            }
        };

        const animateImage = () => {
            // Smooth interpolation using lerp (linear interpolation)
            const lerp = (start, end, factor) => start + (end - start) * factor;
            const smoothFactor = 0.1; // Adjust this value (0-1) for speed: lower = slower/smoother
            
            currentPosition.current.x = lerp(currentPosition.current.x, mousePosition.current.x, smoothFactor);
            currentPosition.current.y = lerp(currentPosition.current.y, mousePosition.current.y, smoothFactor);
            
            if (illustrationRef.current) {
                illustrationRef.current.style.transform = `translate(calc(-50% + ${currentPosition.current.x}px), calc(-50% + ${currentPosition.current.y}px))`;
            }
            
            animationFrameId.current = requestAnimationFrame(animateImage);
        };

        window.addEventListener('mousemove', handleMouseMove);
        animationFrameId.current = requestAnimationFrame(animateImage);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, []);

    return (
        <section className="hero-container">
            {isLoading && (
                <div ref={loader} className="loader"></div>
            )}
            <div className="hero-content">
                <h1 className="headline">Traces</h1>
                <h3 className="subtitle">What We Write Is What We Are</h3>
            </div>
            <div className="illustration-container" ref={illustrationRef}>
                <img src={handDrawnIllustration} alt="Hand drawn poetry illustration" />
            </div>
            <TextCursor
                text="Hello!"
                spacing={80}
                followMouseDirection={true}
                randomFloat={true}
                exitDuration={0.3}
                removalInterval={20}
                maxPoints={10}
            />
        </section>
    );
}

