/*import React from 'react';
import './cardsec.css';
import EyeIcon from './EyeIcon';

export default function CardSec() {
  return (
    <section className="topics-section">
      <div className="topics-header">
        <div className="topics-label">Topics</div>
      </div>

      <div className="topics-list">

        {["Culture", "Media", "Linguistics", "Random"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="topic-item"
          >
            <span className="topic-eye">
              <EyeIcon />
            </span>

            <div className="topic-content">
              <span className="topic-text">{item}</span>
             
            </div>
          </a>
        ))}

      </div>
    </section>
  );
}*/

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './cardsec.css';
import EyeIcon from './EyeIcon';

const topics = [
  {
    title: 'Culture',
    image: 'https://picsum.photos/id/239/300/300',
  },
  {
    title: 'Media',
    image: 'https://picsum.photos/id/237/300/300',
  },
  {
    title: 'Linguistics',
    image: 'https://picsum.photos/id/235/300/300',
  },
  {
    title: 'Random',
    image: 'https://picsum.photos/id/234/300/300',
  },
];

export default function CardSec() {
  const activeImage = useRef(null);

  useEffect(() => {
    const images = gsap.utils.toArray('.topic-image');
    const items = gsap.utils.toArray('.topic-item');
  
    gsap.set(images, { xPercent: -50, yPercent: -50 });
  
    let activeImage = null;
    let setX, setY;
  
    const move = (e) => {
      if (!activeImage) return;
      setX(e.clientX);
      setY(e.clientY);
    };
  
    document.addEventListener('mousemove', move);
  
    items.forEach((item, i) => {
      const image = images[i];
  
      const fade = gsap.to(image, {
        autoAlpha: 1,
        paused: true,
      });
  
      item.addEventListener('mouseenter', (e) => {
        activeImage = image;
  
        setX = gsap.quickTo(image, 'x', { duration: 0.5, ease: 'power3.out' });
        setY = gsap.quickTo(image, 'y', { duration: 0.5, ease: 'power3.out' });
  
        setX(e.clientX);
        setY(e.clientY);
  
        fade.play();
      });
  
      item.addEventListener('mouseleave', () => {
        fade.reverse();
        activeImage = null;
      });
    });
  
    return () => document.removeEventListener('mousemove', move);
  }, []);
  
  

  return (
    <>
    <div className="topics-label">TOPICS</div>
  <div className="topics-list">
    {topics.map((item, i) => (
      <a
        key={item.title}
        href={`#${item.title.toLowerCase()}`}
        className="topic-item"
        data-index={i}
      >
        <span className="topic-eye">
          <EyeIcon />
        </span>
  
        <div className="topic-content">
          <span className="topic-text">{item.title}</span>
        </div>
      </a>
    ))}
  
    {/* Floating images */}
    {topics.map((item, i) => (
      <img
        key={item.title}
        className="topic-image"
        data-index={i}
        src={item.image}
        alt=""
      />
    ))}
  </div>
  </>
  
  );
}

