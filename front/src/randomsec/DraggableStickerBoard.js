import React, { useState, useEffect, useRef } from 'react';
import { Move } from 'lucide-react';

const styles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body, html {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #f8f5f0;
    font-family: 'Georgia', 'Times New Roman', serif;
  }

  .sticker-board {
    width: 100vw;
    height: 100vh;
    background: #f8f5f0;
    position: relative;
    overflow: hidden;
    cursor: grab;
  }

  .sticker-board:active {
    cursor: grabbing;
  }

  .sticker {
    position: absolute;
    background: white;
    border: 1px solid #e8e4dc;
    transition: box-shadow 0.2s ease, transform 0.1s ease;
    padding: 24px;
    display: flex;
    flex-direction: column;
    cursor: move;
    user-select: none;
    touch-action: none;
    z-index: 1;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.05);
  }

  .sticker:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
    z-index: 100;
  }

  .sticker.dragging {
    opacity: 0.9;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    transform: scale(1.02);
    z-index: 1000;
  }

  .sticker::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 0;
    background: #d4a574;
    transition: height 0.3s ease;
    z-index: 0;
  }

  .sticker:hover::before {
    height: 4px;
  }

  .drag-handle {
    position: absolute;
    top: 8px;
    right: 8px;
    opacity: 0.3;
    transition: opacity 0.2s ease;
    cursor: move;
    z-index: 2;
  }

  .sticker:hover .drag-handle {
    opacity: 1;
  }

  .sticker-content {
    position: relative;
    z-index: 1;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  /* Sticker sizes */
  .sticker-large { width: 380px; height: 320px; }
  .sticker-medium { width: 280px; height: 240px; }
  .sticker-small { width: 200px; height: 180px; }
  .sticker-wide { width: 420px; height: 200px; }
  .sticker-tall { width: 240px; height: 340px; }
  .sticker-square { width: 220px; height: 220px; }

  /* Typography */
  .issue-label {
    font-family: 'Courier New', monospace;
    font-size: 11px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: #8c7c6c;
    margin-bottom: 12px;
  }

  .headline-large {
    font-size: 36px;
    line-height: 1.1;
    font-weight: 700;
    font-style: italic;
    margin-bottom: 16px;
    color: #2c2c2c;
  }

  .headline-medium {
    font-size: 24px;
    line-height: 1.3;
    font-weight: 600;
    margin-bottom: 12px;
  }

  .body-text {
    font-size: 16px;
    line-height: 1.7;
    color: #444;
    margin-bottom: 16px;
    flex: 1;
  }

  .caption {
    font-size: 12px;
    font-style: italic;
    color: #777;
    margin-top: auto;
    padding-top: 16px;
    border-top: 1px solid #eee;
  }

  .article-meta {
    font-family: 'Courier New', monospace;
    font-size: 10px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #999;
    margin-top: auto;
  }

  .image-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #f0ede6;
    flex: 1;
  }

  .image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.9;
    transition: opacity 0.3s ease;
  }

  .sticker:hover .image-container img {
    opacity: 1;
  }

  .ornament {
    font-family: 'Georgia', serif;
    font-size: 64px;
    color: #d4a574;
    opacity: 0.3;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
  }

  /* Controls */
  .controls {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
    display: flex;
    gap: 10px;
    background: white;
    padding: 12px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .control-btn {
    background: white;
    border: 1px solid #e8e4dc;
    padding: 8px 16px;
    font-family: 'Courier New', monospace;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
    border-radius: 4px;
  }

  .control-btn:hover {
    background: #f5f3ef;
    border-color: #d4a574;
  }

  .control-btn:active {
    transform: translateY(1px);
  }

  .instructions {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(255, 255, 255, 0.9);
    padding: 12px 24px;
    border-radius: 8px;
    font-family: 'Courier New', monospace;
    font-size: 12px;
    color: #666;
    text-align: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
  }

  @media (max-width: 768px) {
    .sticker {
      padding: 16px;
    }
    
    .sticker-large { width: 300px; height: 260px; }
    .sticker-medium { width: 240px; height: 200px; }
    .sticker-small { width: 180px; height: 160px; }
    .sticker-wide { width: 320px; height: 160px; }
    .sticker-tall { width: 200px; height: 280px; }
    
    .headline-large {
      font-size: 28px;
    }
    
    .headline-medium {
      font-size: 20px;
    }
    
    .body-text {
      font-size: 14px;
    }
    
    .controls {
      top: 10px;
      right: 10px;
      flex-direction: column;
    }
  }
`;

const DraggableSticker = ({ id, size, content, position, onDrag, onDragEnd }) => {
  const stickerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    if (e.target.closest('.drag-handle') || e.target === stickerRef.current) {
      const rect = stickerRef.current.getBoundingClientRect();
      setOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsDragging(true);
      stickerRef.current.style.cursor = 'grabbing';
      e.preventDefault();
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && stickerRef.current) {
      const x = e.clientX - offset.x;
      const y = e.clientY - offset.y;
      
      stickerRef.current.style.left = `${x}px`;
      stickerRef.current.style.top = `${y}px`;
      
      if (onDrag) {
        onDrag(id, { x, y });
      }
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      if (stickerRef.current) {
        stickerRef.current.style.cursor = 'move';
      }
      if (onDragEnd) {
        const rect = stickerRef.current.getBoundingClientRect();
        onDragEnd(id, { x: rect.left, y: rect.top });
      }
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, offset]);

  // Touch events for mobile
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    const rect = stickerRef.current.getBoundingClientRect();
    setOffset({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    });
    setIsDragging(true);
    e.preventDefault();
  };

  const handleTouchMove = (e) => {
    if (isDragging && stickerRef.current) {
      const touch = e.touches[0];
      const x = touch.clientX - offset.x;
      const y = touch.clientY - offset.y;
      
      stickerRef.current.style.left = `${x}px`;
      stickerRef.current.style.top = `${y}px`;
      
      if (onDrag) {
        onDrag(id, { x, y });
      }
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleMouseUp);
      return () => {
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleMouseUp);
      };
    }
  }, [isDragging, offset]);

  return (
    <div
      ref={stickerRef}
      className={`sticker sticker-${size} ${isDragging ? 'dragging' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <div className="drag-handle">
        <Move size={18} />
      </div>
      <div className="sticker-content">
        {content}
      </div>
    </div>
  );
};

function DraggableStickerBoard() {
  const [stickers, setStickers] = useState([
    {
      id: 1,
      size: 'large',
      position: { x: 40, y: 60 },
      content: (
        <>
          <div className="issue-label">Issue No. 47 • Autumn 1978</div>
          <h1 className="headline-large">The Lost Art of Print</h1>
          <p className="body-text">Typography in the age of mechanical reproduction. How letterpress changed our relationship to the written word.</p>
          <div className="article-meta">Feature • 12 pages</div>
        </>
      )
    },
    {
      id: 2,
      size: 'tall',
      position: { x: 440, y: 40 },
      content: (
        <>
          <div className="image-container">
            <img 
              src="https://images.unsplash.com/photo-1545235617-9465d2a55698?w=300&h=400&fit=crop&auto=format" 
              alt="Vintage printing press"
            />
          </div>
          <div className="caption">Letterpress workshop, 1972</div>
        </>
      )
    },
    {
      id: 3,
      size: 'medium',
      position: { x: 700, y: 40 },
      content: (
        <>
          <div className="issue-label">Brief</div>
          <h2 className="headline-medium">Paper Stocks</h2>
          <p className="body-text">A comparison of textures and weights in mid-century publishing.</p>
          <div className="article-meta">Technical Review</div>
        </>
      )
    },
    {
      id: 4,
      size: 'square',
      position: { x: 1000, y: 100 },
      content: (
        <div className="ornament">§</div>
      )
    },
    {
      id: 5,
      size: 'wide',
      position: { x: 200, y: 400 },
      content: (
        <>
          <div className="issue-label">Essay</div>
          <h2 className="headline-medium">Margins & Measurements</h2>
          <p className="body-text">The golden ratio in book design and why certain proportions feel intrinsically right to the human eye.</p>
          <div className="article-meta">By A. Richardson</div>
        </>
      )
    },
    {
      id: 6,
      size: 'medium',
      position: { x: 650, y: 300 },
      content: (
        <>
          <div className="image-container">
            <img 
              src="https://images.unsplash.com/photo-1589998059171-988d887df646?w=350&h=250&fit=crop&auto=format" 
              alt="Type specimens"
            />
          </div>
          <div className="caption">Type specimen collection</div>
        </>
      )
    },
    {
      id: 7,
      size: 'medium',
      position: { x: 850, y: 400 },
      content: (
        <>
          <div className="issue-label">Interview</div>
          <h2 className="headline-medium">The Last Typesetter</h2>
          <p className="body-text">Conversation with a master craftsman who has worked with lead type for sixty years.</p>
          <div className="article-meta">20 min read</div>
        </>
      )
    },
    {
      id: 8,
      size: 'small',
      position: { x: 300, y: 650 },
      content: (
        <div className="ornament" style={{ fontSize: '48px' }}>❦</div>
      )
    },
    {
      id: 9,
      size: 'wide',
      position: { x: 500, y: 650 },
      content: (
        <>
          <div className="issue-label">Review</div>
          <h2 className="headline-medium">Archive & Memory</h2>
          <p className="body-text">How libraries preserve not just information but the physical artifact of knowledge.</p>
          <div className="article-meta">Continued on page 42</div>
        </>
      )
    }
  ]);

  const handleDrag = (id, position) => {
    setStickers(prev => prev.map(sticker => 
      sticker.id === id ? { ...sticker, position } : sticker
    ));
  };

  const shuffleStickers = () => {
    const newStickers = stickers.map(sticker => ({
      ...sticker,
      position: {
        x: Math.random() * (window.innerWidth - 300),
        y: Math.random() * (window.innerHeight - 200)
      }
    }));
    setStickers(newStickers);
  };

  const resetLayout = () => {
    setStickers([
      { id: 1, size: 'large', position: { x: 40, y: 60 }, content: stickers[0].content },
      { id: 2, size: 'tall', position: { x: 440, y: 40 }, content: stickers[1].content },
      { id: 3, size: 'medium', position: { x: 700, y: 40 }, content: stickers[2].content },
      { id: 4, size: 'square', position: { x: 1000, y: 100 }, content: stickers[3].content },
      { id: 5, size: 'wide', position: { x: 200, y: 400 }, content: stickers[4].content },
      { id: 6, size: 'medium', position: { x: 650, y: 300 }, content: stickers[5].content },
      { id: 7, size: 'medium', position: { x: 850, y: 400 }, content: stickers[6].content },
      { id: 8, size: 'small', position: { x: 300, y: 650 }, content: stickers[7].content },
      { id: 9, size: 'wide', position: { x: 500, y: 650 }, content: stickers[8].content }
    ]);
  };

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Georgia:wght@400;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <>
      <style>{styles}</style>
      
      <div className="sticker-board">
        <div className="controls">
          <button className="control-btn" onClick={shuffleStickers}>
            Shuffle
          </button>
          <button className="control-btn" onClick={resetLayout}>
            Reset Layout
          </button>
        </div>

        {stickers.map(sticker => (
          <DraggableSticker
            key={sticker.id}
            id={sticker.id}
            size={sticker.size}
            content={sticker.content}
            position={sticker.position}
            onDrag={handleDrag}
            onDragEnd={handleDrag}
          />
        ))}

        <div className="instructions">
          Drag stickers by the handle icon or anywhere on the sticker • Click and drag to move
        </div>
      </div>
    </>
  );
}

export default DraggableStickerBoard;