import React from 'react';
import './seconsec.css';

export default function SecondSec() {
  return (
    <section className="section-container">
      {/* Main Content */}
      <div className="content-wrapper">
        <div className="message-label">
          <div className="label-line"></div>
          <span>Message</span>
        </div>

        <p className="message-text">As time passes, we deepen our relationship with nature, carefully building up each moment. In a space embraced by trees, you can feel the poetry of light and shadow, and release both your body and mind. This is a place where you can return to your true self in silence, far away from the hustle and bustle.</p>

        <a href="#" className="view-more">
          <span>View more</span>
          <div className="arrow"></div>
        </a>
      </div>
    </section>
  );
}
  