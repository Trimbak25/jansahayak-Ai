chrome.runtime.onMessage.addListener((e,t,n)=>{if(e.action===`processIntent`){let t=e.text.toLowerCase(),r=`I'm sorry, I couldn't understand that. Could you please specify if you need help with PM Awas Yojana, Ration Card, or Pension?`;return t.includes(`pm awas`)||t.includes(`awas`)||t.includes(`housing`)||t.includes(`pmay`)?r=`To apply for PM Awas Yojana, follow these steps:
1. Visit the official PMAY portal (pmaymis.gov.in).
2. Select 'Citizen Assessment' from the menu.
3. Enter your Aadhaar number to proceed.
Would you like me to open the portal for you?`:t.includes(`ration`)||t.includes(`food`)?r=`For Ration Card services, you can apply online through the National Food Security portal (nfsa.gov.in).
1. Register on the portal.
2. Fill out the application form with your family details.
3. Upload income and address proofs.
Do you have these documents ready?`:t.includes(`pension`)||t.includes(`old age`)?r=`To check or apply for the Pension Scheme:
1. Go to nsap.nic.in.
2. Click on 'Pension Payment Details' to check your status.
3. To apply, you need to visit your local Gram Panchayat or Municipal Office.
Is there anything specific you want to know?`:t.includes(`yes`)||t.includes(`open`)?(r=`Opening the relevant government portal in a new tab now. Please look for the floating 'Need Help?' button on the site if you need further assistance.`,chrome.tabs.create({url:`https://www.india.gov.in/`})):(t.includes(`hi`)||t.includes(`hello`)||t.includes(`namaste`))&&(r=`Namaste! How can I assist you with government services today?`),e.language===`hi`&&(r=t.includes(`pm awas`)||t.includes(`awas`)?`पीएम आवास योजना (PM Awas Yojana) के लिए आवेदन करने के लिए:
1. आधिकारिक PMAY पोर्टल (pmaymis.gov.in) पर जाएं।
2. 'Citizen Assessment' चुनें।
3. अपना आधार नंबर दर्ज करें।
क्या मैं आपके लिए पोर्टल खोलूं?`:t.includes(`ration`)||t.includes(`राशन`)?`राशन कार्ड के लिए आप राष्ट्रीय खाद्य सुरक्षा पोर्टल (nfsa.gov.in) के माध्यम से ऑनलाइन आवेदन कर सकते हैं।
1. पोर्टल पर पंजीकरण करें।
2. आवेदन पत्र भरें।
3. आय और पता प्रमाण अपलोड करें।`:t.includes(`pension`)||t.includes(`पेंशन`)?`पेंशन योजना (Pension Scheme) के लिए:
1. nsap.nic.in पर जाएं।
2. अपनी स्थिति जांचने के लिए 'Pension Payment Details' पर क्लिक करें।
3. आवेदन करने के लिए, आपको अपनी स्थानीय ग्राम पंचायत या नगर निगम कार्यालय जाना होगा।`:t.includes(`namaste`)||t.includes(`नमस्ते`)?`नमस्ते! मैं आज सरकारी सेवाओं में आपकी कैसे मदद कर सकता हूँ?`:`क्षमा करें, मैं समझ नहीं पाया। क्या आप पीएम आवास योजना, राशन कार्ड या पेंशन के बारे में पूछना चाहते हैं?`),setTimeout(()=>{n({reply:r})},1e3),!0}});