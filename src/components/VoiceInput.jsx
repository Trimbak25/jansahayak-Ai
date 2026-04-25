import React, { useState, useEffect } from 'react';
import { Mic } from 'lucide-react';

const VoiceInput = ({ onTranscription, isListening, setIsListening, language }) => {
  const [recognition, setRecognition] = useState(null);
  const [interimText, setInterimText] = useState('');

  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    const rec = new SR();
    rec.continuous = false;
    rec.interimResults = true;
    rec.onstart  = () => { setIsListening(true); setInterimText(''); };
    rec.onresult = (e) => {
      let interim = '', final = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) final += e.results[i][0].transcript;
        else interim += e.results[i][0].transcript;
      }
      setInterimText(interim);
      if (final) { onTranscription(final); setInterimText(''); setIsListening(false); }
    };
    rec.onerror = () => setIsListening(false);
    rec.onend   = () => setIsListening(false);
    setRecognition(rec);
  }, [onTranscription, setIsListening]);

  useEffect(() => {
    if (recognition) recognition.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
  }, [language, recognition]);

  const toggle = () => {
    if (!recognition) { alert('Speech recognition not supported.'); return; }
    isListening ? recognition.stop() : recognition.start();
  };

  return (
    <div className="voice-input-container">
      <div className={`live-transcript ${isListening ? 'visible' : ''}`}>
        <span className="transcript-dot" />
        <span className="transcript-text">
          {interimText || (language === 'hi' ? 'बोलिए, मैं सुन रहा हूँ...' : 'Listening, please speak...')}
        </span>
      </div>

      <div className="mic-wrapper">
        {isListening && (
          <div className="rings-container">
            <div className="wave-ring ring-1"/>
            <div className="wave-ring ring-2"/>
            <div className="wave-ring ring-3"/>
          </div>
        )}
        <button
          className={`mic-btn ${isListening ? 'mic-btn--listening' : 'mic-btn--idle'}`}
          onClick={toggle}
          aria-label={isListening ? 'Stop' : 'Speak'}
        >
          {isListening
            ? <div className="waveform-bars">
                {[...Array(7)].map((_,i)=><div key={i} className="wave-bar" style={{animationDelay:`${i*0.1}s`}}/>)}
              </div>
            : <Mic className="mic-icon" strokeWidth={2.5} />
          }
        </button>
      </div>

      <p className={`mic-label ${isListening ? 'mic-label--active' : ''}`}>
        {isListening
          ? (language === 'hi' ? 'सुन रहा हूँ...' : 'Listening...')
          : (language === 'hi' ? 'बोलने के लिए दबाएँ' : 'Tap to Speak')}
      </p>
    </div>
  );
};

export default VoiceInput;
