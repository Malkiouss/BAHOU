import React from 'react';
import './navbar.css';

export default function NavBar() {
    return (
        <header>
            <div className="logo-section">
                <div className="logo">BHO</div>
                <div className="logo-subtitle">BAHOUHoussian.</div>
            </div>
            <nav>
                <a href="#about">About</a>
                <a href="#rooms">Rooms</a>
                <a href="#terrace">Terrace</a>
                <a href="#cafe">Cafe&Bar</a>
                <a href="#feature">Feature</a>
            </nav>
        </header>
    );
}

