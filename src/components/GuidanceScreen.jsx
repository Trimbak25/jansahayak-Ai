import React, { useState } from 'react';
import { CheckCircle, ArrowLeft, ArrowRight, XCircle } from 'lucide-react';

const DATA = {
  'PM Awas Yojana': {
    en: 'PM Awas Yojana', hi: 'पीएम आवास योजना',
    steps: [
      { icon:'✅', en:['Check Eligibility','Annual household income must be below ₹3 lakh (EWS) or ₹6 lakh (LIG) to apply.'], hi:['पात्रता जाँचें','आवेदन के लिए वार्षिक आय ₹3 लाख (EWS) या ₹6 लाख (LIG) से कम होनी चाहिए।'] },
      { icon:'📄', en:['Gather Documents','Aadhaar Card, Income Certificate, Bank Passbook, Caste Certificate (if applicable).'], hi:['दस्तावेज़ इकट्ठा करें','आधार कार्ड, आय प्रमाण पत्र, बैंक पासबुक, जाति प्रमाण पत्र।'] },
      { icon:'🏢', en:['Visit CSC Center','Go to the nearest Common Service Center or gram panchayat with your documents.'], hi:['CSC केंद्र जाएँ','दस्तावेज़ों के साथ नजदीकी CSC या ग्राम पंचायत जाएँ।'] },
      { icon:'🎉', en:['Application Submitted','You will receive a reference number to track your application status online.'], hi:['आवेदन जमा हुआ','आपको ऑनलाइन स्थिति जांचने के लिए एक संदर्भ संख्या मिलेगी।'] },
    ],
  },
  'Ration Card': {
    en: 'Ration Card', hi: 'राशन कार्ड',
    steps: [
      { icon:'✅', en:['Check Eligibility','Families with annual income below ₹1 lakh and not owning government housing are eligible.'], hi:['पात्रता जाँचें','वार्षिक आय ₹1 लाख से कम और सरकारी आवास न रखने वाले परिवार पात्र हैं।'] },
      { icon:'📄', en:['Gather Documents','Aadhaar Cards for all members, Address Proof, and Passport-size Photos.'], hi:['दस्तावेज़ इकट्ठा करें','सभी सदस्यों के आधार कार्ड, पता प्रमाण, और पासपोर्ट फोटो।'] },
      { icon:'🏢', en:['Submit Application','Submit at the nearest Food & Supply Office or through your state online portal.'], hi:['आवेदन जमा करें','नजदीकी खाद्य कार्यालय या राज्य ऑनलाइन पोर्टल के माध्यम से जमा करें।'] },
      { icon:'🎉', en:['Card Issued','Your ration card will be issued within 30 days. Collect from your local fair price shop.'], hi:['कार्ड जारी हुआ','राशन कार्ड 30 दिनों में जारी होगा। स्थानीय उचित मूल्य दुकान से लें।'] },
    ],
  },
  'Pension Scheme': {
    en: 'Pension Scheme', hi: 'पेंशन योजना',
    steps: [
      { icon:'✅', en:['Check Eligibility','Age must be 60+ years and family must be BPL (Below Poverty Line) listed.'], hi:['पात्रता जाँचें','आयु 60 वर्ष या अधिक और परिवार BPL सूचीबद्ध होना चाहिए।'] },
      { icon:'📄', en:['Gather Documents','Age Proof (Aadhaar), BPL Certificate, Bank Account Details, Passport Photo.'], hi:['दस्तावेज़ इकट्ठा करें','आयु प्रमाण (आधार), BPL प्रमाण पत्र, बैंक खाता विवरण, पासपोर्ट फोटो।'] },
      { icon:'🏢', en:['Apply at Panchayat','Visit your gram panchayat or municipality office and fill the IGNOAPS form.'], hi:['पंचायत में आवेदन करें','ग्राम पंचायत जाएँ और IGNOAPS फॉर्म भरें।'] },
      { icon:'🎉', en:['Pension Approved','₹500–₹1500/month transferred directly to your bank account every month.'], hi:['पेंशन स्वीकृत','₹500–₹1500/माह सीधे आपके बैंक खाते में हर महीने ट्रांसफर होगा।'] },
    ],
  },
};

const GuidanceScreen = ({ service, language, onClose }) => {
  const [step, setStep] = useState(0);
  const data   = DATA[service] || DATA['PM Awas Yojana'];
  const steps  = data.steps;
  const total  = steps.length;
  const s      = steps[step];
  const isLast = step === total - 1;
  const lang   = language === 'hi' ? 'hi' : 'en';
  const title  = data[lang === 'hi' ? 'hi' : 'en'];

  return (
    <div className="guidance-overlay">
      <div className="tricolor-bar">
        <div className="tricolor-saffron"/><div className="tricolor-white"/><div className="tricolor-green"/>
      </div>

      <div className="guidance-header">
        <button className="guidance-close-btn" onClick={onClose} aria-label="Close"><XCircle size={20}/></button>
        <h2 className="guidance-title">{title}</h2>
        <span className="guidance-step-count">{step+1} / {total}</span>
      </div>

      <div className="guidance-progress-track">
        <div className="guidance-progress-fill" style={{width:`${((step+1)/total)*100}%`}}/>
      </div>

      <div className="guidance-dots">
        {steps.map((_,i)=>(
          <button key={i} className={`guidance-dot ${i===step?'active':''} ${i<step?'done':''}`} onClick={()=>setStep(i)} aria-label={`Step ${i+1}`}>
            {i<step && <CheckCircle size={8}/>}
          </button>
        ))}
      </div>

      <div className="guidance-content">
        <div className="guidance-icon">{s.icon}</div>
        <div className="guidance-divider"/>
        <h3 className="guidance-step-title">{s[lang][0]}</h3>
        <p  className="guidance-step-detail">{s[lang][1]}</p>
      </div>

      <div className="guidance-nav">
        {step > 0 && (
          <button className="guidance-btn guidance-btn--secondary" onClick={()=>setStep(s=>s-1)}>
            <ArrowLeft size={22} strokeWidth={3} /> 
            <span>{lang==='hi'?'पीछे':'Back'}</span>
          </button>
        )}
        {!isLast
          ? <button className="guidance-btn guidance-btn--primary" onClick={()=>setStep(s=>s+1)}>
              <span>{lang==='hi'?'अगला':'Next'}</span>
              <ArrowRight size={22} strokeWidth={3} />
            </button>
          : <button className="guidance-btn guidance-btn--done" onClick={onClose}>
              <CheckCircle size={22} strokeWidth={3} />
              <span>{lang==='hi'?'हो गया':'Done'}</span>
            </button>
        }
      </div>
    </div>
  );
};

export default GuidanceScreen;
