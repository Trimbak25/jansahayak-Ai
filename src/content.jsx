import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { ShieldCheck, X } from 'lucide-react';
import './content.css';

const FloatingHelper = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="jansahayak-floating-container">
      {isOpen && (
        <div className="jansahayak-tooltip">
          <div className="jansahayak-tooltip-header">
            <ShieldCheck size={18} color="#000080" />
            <span>JanSahayak AI</span>
            <button onClick={() => setIsOpen(false)} className="jansahayak-close-btn">
              <X size={16} />
            </button>
          </div>
          <div className="jansahayak-tooltip-body">
            <p>Need help filling out this form? Open the JanSahayak extension to get step-by-step voice assistance!</p>
          </div>
        </div>
      )}
      <button 
        className="jansahayak-floating-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        <ShieldCheck size={24} color="#fff" />
        <span className="jansahayak-btn-text">Need Help?</span>
      </button>
    </div>
  );
};

// Inject into DOM
const injectRoot = document.createElement('div');
injectRoot.id = 'jansahayak-extension-root';
document.body.appendChild(injectRoot);

ReactDOM.createRoot(injectRoot).render(
  <React.StrictMode>
    <FloatingHelper />
  </React.StrictMode>
);
