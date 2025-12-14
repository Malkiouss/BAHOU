import React from 'react';
import './cardsec.css';

export default function CardSec() {
  return (
    <section className="section2-container">
      {/* Header */}
      <div className="header">
        <h1 className="heading">Rooms</h1>
        <div className="pagination">1 — 4</div>
      </div>

      {/* Room Cards */}
      <div className="cards-container">
        {/* Card 1 */}
        <div className="room-card">
          <img src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=720&fit=crop" alt="Deluxe Double" className="card-image" />
          <div className="card-overlay">
            <h2 className="card-title">Deluxe Double</h2>
          </div>
        </div>

        {/* Card 2 */}
        <div className="room-card">
          <img src="https://images.unsplash.com/photo-1570129477492-45a003537e1f?w=600&h=720&fit=crop" alt="Standard Double" className="card-image" />
          <div className="card-overlay">
            <h2 className="card-title">Standard Double</h2>
          </div>
        </div>

        {/* Card 3 */}
        <div className="room-card">
          <img src="https://images.unsplash.com/photo-1598928506323-a8a4a8f22f99?w=600&h=720&fit=crop" alt="Mix Dormitory" className="card-image" />
          <div className="card-overlay">
            <h2 className="card-title">Mix Dormitory</h2>
          </div>
        </div>
      </div>

     
    </section>
  );
}
  