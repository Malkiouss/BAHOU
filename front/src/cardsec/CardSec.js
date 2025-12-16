import React from 'react';
import './cardsec.css';

export default function CardSec() {
  return (
    <section className="section2-container">
      {/* Header */}
      <div className="header">
        <h1 className="heading">TOPICS</h1>
        <div className="pagination">1 — 4</div>
      </div>

      {/* Room Cards */}
      <div className="cards-container">
        {/* Card 1 */}
        <div className="room-item">
          <div className="room-card">
            <img src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=720&fit=crop" alt="Deluxe Double" className="card-image" />
            <div className="card-overlay">
              <h2 className="card-title">Deluxe Double</h2>
            </div>
          </div>
          <p className="card-description">広々とした空間に配置された一台のクイーンサイズベッド。上質なリネンと厳選されたアメニティで、最高のリラックスを実現します。バルコニーからは自然の景観をご覧いただけます。</p>
          <a className="card-button">View More</a>
        </div>

        {/* Card 2 */}
        <div className="room-item">
          <div className="room-card">
            <img src="https://images.unsplash.com/photo-1570129477492-45a003537e1f?w=600&h=720&fit=crop" alt="Standard Double" className="card-image" />
            <div className="card-overlay">
              <h2 className="card-title">Standard Double</h2>
            </div>
          </div>
          <p className="card-description">機能的でありながら快適な客室。ツインベッドまたはダブルベッドをお選びいただけます。モダンなデザインと落ち着いた照明が、心地よい滞在をお約束します。</p>
          <a className="card-button">View More</a>
        </div>

        {/* Card 3 */}
        <div className="room-item">
          <div className="room-card">
            <img src="https://images.unsplash.com/photo-1598928506323-a8a4a8f22f99?w=600&h=720&fit=crop" alt="Mix Dormitory" className="card-image" />
            <div className="card-overlay">
              <h2 className="card-title">Mix Dormitory</h2>
            </div>
          </div>
          <p className="card-description">二段ベッド2台を備えた、4名定員のドミトリールームです。各ベッドは幅100cmのゆったりとしたシングルサイズ。13cm厚のマットレスが、旅の疲れをしっかりと癒します。</p>
          <a className="card-button">View More</a>
        </div>
      </div>
    </section>
  );
}
  