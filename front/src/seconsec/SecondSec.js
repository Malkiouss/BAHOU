/*import React from 'react';
import './seconsec.css';

export default function SecondSec() {
  return (
    <section className="section-container">
     
      <div className="content-wrapper">
        <div className="message-label">
          <div className="label-line"></div>
          <span>Message</span>
        </div>

        <p className="message-text"> <p className="message-q">“</p>“I’m not trying to explain anything here.
I’m only sharing what felt worth keeping.
Some of it became words, some became images,
and some simply stayed as they were — unfinished, honest.”<p className="message-q2">”</p></p>

        <a href="#" className="view-more">
          <span>View more</span>
          <div className="arrow"></div>
        </a>
      </div>
    </section>
  );
}
  */

import React from "react";
import "./seconsec.css";
import { useEffect } from "react";
import gsap from "gsap";
import {SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText,ScrollTrigger);


 




export default function SecondSec() {
  useEffect(() => {
    let split = SplitText.create(".message-text", {
      type: "chars,words,lines"
    });

    // Set initial state - words hidden
    gsap.set(split.words, {
      y: 100,
      opacity: 0
    });

    // Scroll animation with pin
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".section-container",
        start: "top top",
        end: "+=200%", // Pin for 200% of viewport height
        pin: true,
        scrub: 1,
        markers: false // Set to true for debugging
      }
    });

    // Reveal words on scroll
    tl.to(split.words, {
      y: 0,
      opacity: 1,
      stagger: 0.02,
      ease: "power2.out"
    });

    return () => {
      if (split) split.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);



  return (
    <section className="section-container">
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
