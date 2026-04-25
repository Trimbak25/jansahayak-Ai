import { HeartPulse, FileText, Briefcase, PlayCircle } from 'lucide-react';

const services = [
  {
    id: 'ayushman', Icon: HeartPulse,
    image: '/services/ayushman.png',
    en: { title: 'Ayushman Bharat',  desc: 'Healthcare & Medical Insurance' },
    hi: { title: 'आयुष्मान भारत', desc: 'स्वास्थ्य और चिकित्सा बीमा' },
    color: '#E31E24', bg: 'rgba(227,30,36,0.10)',
  },
  {
    id: 'digilocker', Icon: FileText,
    image: '/services/digilocker.png',
    en: { title: 'DigiLocker',  desc: 'Secure Digital Document Wallet' },
    hi: { title: 'डिजी लॉकर',  desc: 'सुरक्षित डिजिटल दस्तावेज़ वॉलेट' },
    color: '#1E88E5', bg: 'rgba(30,136,229,0.10)',
  },
  {
    id: 'eshram', Icon: Briefcase,
    image: '/services/eshram.png',
    en: { title: 'E-Shram Card',      desc: 'Benefits for Unorganized Workers' },
    hi: { title: 'ई-श्रम कार्ड',         desc: 'असंगठित श्रमिकों के लिए लाभ' },
    color: '#F57C00', bg: 'rgba(245,124,0,0.12)',
  },
];

const ServiceCards = ({ onSelect, onSimulate, language }) => (
  <div className="service-cards-wrapper">
    <p className="service-cards-label">
      {language === 'hi' ? '🙏 सेवा का चयन करें' : '🙏 SELECT A SERVICE'}
    </p>
    <div className="service-cards-grid">
      {services.map(({ id, Icon, image, en, hi, color, bg }) => {
        const t = language === 'hi' ? hi : en;
        return (
          <div key={id} className="service-card-v2" style={{ '--card-color': color }}>
            <div className="service-card-image-container">
              <img src={image} alt={t.title} className="service-card-image" />
              <div className="service-card-icon-overlay" style={{ background: bg }}>
                <Icon size={24} color={color} strokeWidth={2.5} />
              </div>
            </div>
            <div className="service-card-content">
              <div className="service-card-info">
                <h3 className="service-card-title">{t.title}</h3>
                <p  className="service-card-desc">{t.desc}</p>
              </div>
              <div className="service-card-actions">
                <button 
                  className="service-action-btn primary" 
                  onClick={() => onSelect(en.title)}
                >
                  {language === 'hi' ? 'विवरण' : 'Details'}
                </button>
                <button 
                  className="service-action-btn simulate" 
                  onClick={() => onSimulate(en.title)}
                >
                  <PlayCircle size={14} />
                  <span>{language === 'hi' ? 'सिमुलेशन' : 'Simulation'}</span>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default ServiceCards;
