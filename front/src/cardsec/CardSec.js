import React from 'react';
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
}
