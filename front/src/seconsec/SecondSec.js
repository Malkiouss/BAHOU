import React, { useRef } from "react";
import "./seconsec.css";
import gsap from "gsap";
import { useGSAP } from '@gsap/react'; 
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(SplitText, ScrollTrigger);

export default function SecondSec() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const messageText = sectionRef.current.querySelector(".message-text");
    if (!messageText) return;

    let split = SplitText.create(messageText, {
      type: "chars,words",
      linesClass: "line",
      wordsClass: "word",
      charsClass: "char",
      autoSplit: true
    });

    // Set initial state - words hidden
    gsap.set(split.words, {
      y: 100,
      opacity: 0
    });

    // Scroll animation with pin
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=200%", // Pin for 200% of viewport height
        pin: true,
        scrub: 1,
        markers: true, // Temporarily enabled for debugging
        anticipatePin: 1
      }
    });

    // Reveal words on scroll
    tl.to(split.words, {
      y: 0,
      opacity: 1,
      stagger: 0.02,
      ease: "power2.out"
    });

    // Cleanup function
   
  });



  return (
    <section ref={sectionRef} className="section-container">
      <div className="content-wrapper">
        
        {/* Label */}
        <div className="message-label">
          <div className="label-line"></div>
          <span>Message</span>
        </div>

        {/* Message */}
        <div className="message-text">
          <span className="message-q">“</span>

              <p className="line">Before anything could be remembered,it was written.
                                  Writing began as a way to remember.
                                  It became a way to understand.
                                   It remains a way to be human.
                    </p>

          <span className="message-q2">”</span>
        </div>

        {/* CTA */}
        <a href="#" className="view-more">
          <span>View more</span>
          <div className="arrow"></div>
        </a>

      </div>
    </section>
  );
}
