import { useState, useEffect, useRef } from 'react';
import { Send, ShieldCheck, Sun, Moon } from 'lucide-react';
import ChatBubble    from './components/ChatBubble';
import ServiceCards  from './components/ServiceCards';
import VoiceInput    from './components/VoiceInput';
import GuidanceScreen from './components/GuidanceScreen';

const MOCK = {
  en: {
    default:        "I understand your query. Please provide more details so I can help you better with government services.",
    'Ayushman Bharat': "Ayushman Bharat provides healthcare and insurance coverage of up to ₹5 Lakhs per family. Would you like to check your eligibility?",
    'DigiLocker':    "DigiLocker is a secure cloud platform for storage, sharing and verification of documents. Shall I help you upload your Aadhaar?",
    'E-Shram Card': "E-Shram card provides social security benefits to unorganized workers. Want to see how to register?",
  },
  hi: {
    default:        "मैं आपकी बात समझ गया। कृपया अधिक जानकारी दें।",
    'Ayushman Bharat': "आयुष्मान भारत प्रति परिवार ₹5 लाख तक का स्वास्थ्य बीमा देता है। क्या आप अपनी पात्रता जाँचना चाहेंगे?",
    'DigiLocker':    "डिजी लॉकर दस्तावेजों के भंडारण और साझा करने के लिए एक सुरक्षित मंच है। क्या मैं आपकी मदद करूँ?",
    'E-Shram Card': "ई-श्रम कार्ड असंगठित श्रमिकों को सामाजिक सुरक्षा लाभ प्रदान करता है। क्या आप पंजीकरण देखना चाहते हैं?",
  },
};
const SERVICES = ['Ayushman Bharat','DigiLocker','E-Shram Card'];
const PREDEFINED = {
  en: { 'hello': 'Namaste! How can I help you today?', 'hi': 'Hello! How can I assist you with government services?', 'thanks': 'You are welcome! Happy to help.' },
  hi: { 'hello': 'नमस्ते! मैं आपकी कैसे मदद कर सकता हूँ?', 'hi': 'नमस्ते! आज मैं आपकी क्या सहायता कर सकता हूँ?', 'thanks': 'आपका स्वागत है! कुछ और पूछना हो तो बताएं।' }
};

function App() {
  const [messages, setMessages] = useState([{
    id:1, sender:'assistant',
    text:'Namaste! 🙏 I am JanSahayak AI — your guide to Indian government services.',
    isTyping:false,
  }]);
  const [input,          setInput]          = useState('');
  const [isListening,    setIsListening]    = useState(false);
  const [theme,          setTheme]          = useState('light');
  const [language,       setLanguage]       = useState('en');
  const [activeGuidance, setActiveGuidance] = useState(null);
  const [highContrast,   setHighContrast]   = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior:'smooth' }); }, [messages]);
  useEffect(() => {
    document.documentElement.setAttribute('data-theme',    theme);
    document.documentElement.setAttribute('data-contrast', highContrast ? 'high' : 'normal');
  }, [theme, highContrast]);

  const processQuery = (userText) => {
    const text = userText.toLowerCase();
    let intentContext = "";

    if (text.includes("kaise kare") || text.includes("how to")) {
      intentContext = "Intent: Step-by-step guide requested.";
    } else if (text.includes("kya hai") || text.includes("what is")) {
      intentContext = "Intent: Simple explanation requested.";
    } else if (text.includes("apply") || text.includes("आवेदन")) {
      intentContext = "Intent: Application process and documents requested.";
    } else if (text.includes("status") || text.includes("स्थिति")) {
      intentContext = "Intent: Tracking steps requested.";
    }

    return `Context: ${intentContext}
Role: Government Assistant for Indian citizens.
Rule: Use simple language. Give steps for "how-to". Give explain+eligibility+docs for schemes.
User query: ${userText}`;
  };

  const getMock = (text) => {
    const r = MOCK[language] || MOCK.en;
    const lower = text.toLowerCase();
    for (const s of SERVICES)
      if (lower.includes(s.toLowerCase())) return r[s] || r.default;
    return r.default;
  };

  const send = async (text) => {
    if (!text.trim()) return;
    const uid = Date.now();
    const tid = uid + 1;
    const rid = uid + 2; // Fixed ID for the response message
    
    setMessages(p => [...p, { id: uid, sender: 'user', text, isTyping: false }]);
    setInput('');
    setMessages(p => [...p, { id: tid, sender: 'assistant', text: '', isTyping: true }]);

    const updateResponse = (reply, isFinal = true) => {
      setMessages(p => {
        const filtered = p.filter(m => m.id !== tid); // Remove typing indicator
        const exists = filtered.find(m => m.id === rid);
        if (exists) {
          return filtered.map(m => m.id === rid ? { ...m, text: reply } : m);
        }
        return [...filtered, { id: rid, sender: 'assistant', text: reply, isTyping: false }];
      });
      if (isFinal) speak(reply);
    };

    // 1. Check for Predefined (0.5 - 1s delay for natural feel)
    const lowerText = text.toLowerCase().trim();
    const quickMatch = PREDEFINED[language]?.[lowerText];
    if (quickMatch) {
      await new Promise(r => setTimeout(r, 600));
      updateResponse(quickMatch);
      return;
    }

    // 2. Real AI with 2s Timeout Fallback
    const processedPrompt = processQuery(text);
    let aiResolved = false;
    
    const aiPromise = new Promise((resolve) => {
      if (typeof chrome !== 'undefined' && chrome?.runtime?.sendMessage) {
        chrome.runtime.sendMessage({ 
          action: 'processIntent', 
          text: processedPrompt,
          originalText: text,
          language 
        }, r => {
          aiResolved = true;
          resolve(r?.reply);
        });
      } else {
        setTimeout(() => { aiResolved = true; resolve(getMock(text)); }, 400);
      }
    });

    const timeoutPromise = new Promise(r => setTimeout(() => r('TIMEOUT'), 2000));

    const firstResult = await Promise.race([aiPromise, timeoutPromise]);

    if (firstResult === 'TIMEOUT') {
      updateResponse(getMock(text), false); // Show fallback instantly
      // Wait for real AI in background
      aiPromise.then(realReply => {
        if (realReply) updateResponse(realReply);
      });
    } else {
      updateResponse(firstResult || getMock(text));
    }

    for (const s of SERVICES) {
      if (text.toLowerCase().includes(s.toLowerCase())) {
        setActiveGuidance(s); break;
      }
    }
  };

  const speak = (text) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
    window.speechSynthesis.speak(u);
  };

  return (
    <div className="app-shell">
      <div className="app-container warli-bg">

        {/* Tricolor */}
        <div className="tricolor-bar">
          <div className="tricolor-saffron"/><div className="tricolor-white"/><div className="tricolor-green"/>
        </div>

        {/* Header */}
        <header className="app-header">
          <div className="header-brand">
            <div className="brand-badge">
              <ShieldCheck size={20} className="brand-icon" strokeWidth={3} />
            </div>
            <div>
              <h1 className="brand-title">JanSahayak AI</h1>
              <p className="brand-subtitle">
                {language === 'hi' ? 'आपका डिजिटल सहायक' : 'Your Digital Assistant'}
              </p>
            </div>
          </div>
          <div className="header-controls">
            <button className="ctrl-btn lang-btn" onClick={() => setLanguage(l => l === 'en' ? 'hi' : 'en')} aria-label="Toggle language">
              {language === 'en' ? 'हि' : 'EN'}
            </button>
            <button className={`ctrl-btn ${highContrast ? 'ctrl-btn--active' : ''}`} onClick={() => setHighContrast(h => !h)} title="Accessibility">
              <span style={{ fontSize: '18px', fontWeight: '800' }}>A</span>
            </button>
            <button className="ctrl-btn" onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')} aria-label="Toggle theme">
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>
        </header>

        {/* Trust Badge */}
        <div className="trust-badge">
          <ShieldCheck size={14} strokeWidth={3} />
          <span>{language === 'hi' ? 'भारत सरकार द्वारा अधिकृत' : 'GOVERNMENT OF INDIA AUTHORIZED'}</span>
        </div>

        {/* Chat */}
        <main className="chat-area">
          {messages.length === 1 && (
            <div className="hero-logo-container">
              <img src="/logo_hero.jpg" alt="JanSahayak AI Logo" className="hero-logo" />
            </div>
          )}
          {messages.map(m => <ChatBubble key={m.id} message={m} onSpeak={speak}/>)}
          <div ref={endRef}/>
        </main>

        {/* Footer */}
        <footer className="app-footer">
          <VoiceInput onTranscription={send} isListening={isListening} setIsListening={setIsListening} language={language}/>
          <div className="text-input-row">
            <input
              id="chat-input"
              className="chat-input"
              type="text"
              value={input}
              onChange={e=>setInput(e.target.value)}
              onKeyDown={e=>e.key==='Enter'&&send(input)}
              placeholder={language==='hi'?'अपनी समस्या यहाँ लिखें...':'Type your query here...'}
              aria-label="Type your message"
            />
            <button className="send-btn" onClick={()=>send(input)} disabled={!input.trim()} aria-label="Send">
              <Send size={20} strokeWidth={2.5} />
            </button>
          </div>
        </footer>

        {/* Guidance Overlay */}
        {activeGuidance && (
          <GuidanceScreen service={activeGuidance} language={language} onClose={()=>setActiveGuidance(null)}/>
        )}
      </div>
    </div>
  );
}

export default App;
