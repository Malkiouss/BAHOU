import React from 'react';

import './randomsec.css';
export default function RandomSec() {
  return (
    <>
      <div className="vertical-title">très_bobo</div>
      
      <div className="container">
        {/* Hero Section */}
        <div className="hero-section grid-item">
          <div>
            <div className="hero-title">Acknowledgement of Country</div>
            <p className="hero-text">Counter Forms was made on/across/between the stolen lands of many Sovereign people including on Wurundjeri and Whadjuk lands. We recognise our practices are situated on unceded land and that colonisation continues today. We seek to wrestle, reckon and confront these ongoing injustices.</p>
          </div>
          <div className="hero-artist">HERBIK, DANIEL VENEKLAAS</div>
        </div>

        {/* Large V */}
        <div className="large-v grid-item">V</div>

        {/* Image Section 1 - Short */}
        <div className="grid-section grid-item grid-item-1">
          <div>
            <div className="section-label">Counter-, Dennis Grauel</div>
            <img className="grid-image" src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop" alt="Project" />
          </div>
        </div>

        {/* Image Section 2 - Tall */}
        <div className="grid-section grid-item grid-item-2">
          <div>
            <div className="section-label">Eyja, Thy Ha</div>
            <img className="grid-image" src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=400&fit=crop" alt="Project" />
            <p className="section-text">Contemporary design celebrates asymmetry and unexpected pairings of visual elements.</p>
          </div>
        </div>

        {/* Typography Section - Medium */}
        <div className="typography-section grid-item grid-item-3">
          <div className="section-label">Representing the Sounds of Australian Indigenous Languages</div>
          <div className="typography-grid">
            <div className="ty-cell">K</div>
            <div className="ty-cell">a</div>
            <div className="ty-cell">m</div>
            <div className="ty-cell">i</div>
            <div className="ty-cell">K</div>
            <div className="ty-cell">a</div>
            <div className="ty-cell">m</div>
            <div className="ty-cell">i</div>
            <div className="ty-cell">K</div>
            <div className="ty-cell">a</div>
            <div className="ty-cell">m</div>
            <div className="ty-cell">i</div>
            <div className="ty-cell">K</div>
            <div className="ty-cell">a</div>
            <div className="ty-cell">m</div>
            <div className="ty-cell">u</div>
          </div>
        </div>

        {/* Document Section - Full Width */}
        <div className="grid-section full-width-image grid-item grid-item-4">
          <div className="section-label">Violent Shapes on Stolen Land, Dennis Grauel</div>
          <p className="section-text">An Act to include the Intermediate within the Settled Districts. WHEREAS it is expedient to amend the limits of the Districts... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>

        {/* Large italic text */}
        <div className="large-italic grid-item grid-item-5">
          <p className="large-italic-text">It's 2020. I'm sitting at my dining table in London</p>
        </div>

        {/* Full Width Image - Tall */}
        <div className="full-width-image grid-item grid-item-6">
          <div className="section-label">Eyja Italic Has Arrived</div>
          <img src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=450&fit=crop" alt="Project" />
        </div>

        {/* Bottom Grid Items */}
        <div className="grid-section grid-item grid-item-7">
          <div className="section-label">Revivals, Seb Mclaughlan</div>
          <p className="section-text">Contemporary design doesn't follow rules. It breaks them intentionally. My work celebrates asymmetry, unexpected color palettes, and editorial sensibilities.</p>
        </div>

        <div className="grid-section grid-item grid-item-8">
          <div className="section-label">Eyja, Thy Ha</div>
          <img className="grid-image" src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop" alt="Project" />
        </div>

        <div className="grid-section grid-item grid-item-9">
          <div className="section-label">PPP Table & Calculator</div>
          <img className="grid-image" src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop" alt="Project" />
        </div>
      </div>
    </>
  );
}