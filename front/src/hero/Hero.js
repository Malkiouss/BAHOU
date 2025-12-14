import React from 'react';
import './hero.css';
import treehouseIllustration from './408653651_fd6697cd-b3e9-48a3-a988-ae8a6c8ced7f.jpg';
export default function Hero() {
    return (
        <section className="hero-container">
            <div className="hero-content">
                <div className="illustration-container">
                    <img src={treehouseIllustration} alt="Treehouse illustration" />
                </div>
                <h1 className="headline">Slow and Light</h1>
            </div>
        </section>
    );
}

