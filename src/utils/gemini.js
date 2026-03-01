// react-notes/src/utils/gemini.js
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export async function callGemini(prompt, systemInstruction, retries = 3) {
    if (!API_KEY) {
        return "<i>Error: API Key is missing. Please add VITE_GEMINI_API_KEY to your .env file or Vercel settings.</i>";
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
    const payload = {
        contents: [{ parts: [{ text: systemInstruction + "\n\n" + prompt }] }]
    };

    const delays = [1000, 2000, 4000];
    
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            const data = await response.json();
            return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
        } catch (error) {
            if (i === retries - 1) return `<i>Error connecting to AI Tutor: ${error.message}. Please try again.</i>`;
            await new Promise(res => setTimeout(res, delays[i]));
        }
    }
}
