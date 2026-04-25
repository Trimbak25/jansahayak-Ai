import { GoogleGenerativeAI } from '@google/generative-ai';

// In a production extension, API keys should be handled securely on a backend.
// For this hackathon prototype, we use the environment variable.
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'YOUR_API_KEY_HERE';
const genAI = new GoogleGenerativeAI(API_KEY);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'processIntent') {
    handleQuery(request.text, request.language)
      .then(reply => {
        sendResponse({ reply });
      })
      .catch(err => {
        console.error(err);
        sendResponse({ reply: "I'm sorry, an error occurred while processing your request." });
      });
    return true; // Indicates an async response
  }
});

async function handleQuery(query, language) {
  try {
    if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE') {
      return "Please set your Gemini API key in the .env file (VITE_GEMINI_API_KEY) and rebuild the extension to use the AI assistant.";
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: { maxOutputTokens: 250, temperature: 0.7 } 
    });
    
    const systemInstruction = `You are JanSahayak AI. Reply in ${language === 'hi' ? 'Hindi' : 'English'}.
Keep it simple, clear, and concise (max 3-4 sentences). 
No markdown formatting (**bold**, etc.).`;

    const result = await model.generateContent(`${systemInstruction}\n\n${query}`);
    const response = result.response;
    return response.text().trim();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm sorry, I am currently facing technical difficulties. Please try again later.";
  }
}
