// react-notes/src/components/Note.jsx
import { useState, useRef } from 'react';
import { callGemini } from '../utils/gemini';

export default function Note({ title, children, isAdvanced, fullWidth }) {
  const [explanation, setExplanation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const cardRef = useRef(null);

  const handleExplain = async (e) => {
    e.stopPropagation();
    
    // Toggle visibility if already loaded
    if (explanation) {
      setShowExplanation(!showExplanation);
      return;
    }

    setLoading(true);
    setShowExplanation(true);

    // Get text content for AI, removing the button text
    const cardText = cardRef.current.innerText.replace('✨ ELI5', '');
    
    const systemPrompt = `You are a friendly, expert React JS tutor. Your job is to explain the provided React concept to a beginner using the "Explain Like I'm 5" (ELI5) method. 
    Use very simple language and a helpful real-world analogy. 
    Format your response in simple HTML (use <p>, <b>, <i>, <ul>, <li>). Do NOT use markdown. Do NOT include markdown blocks like \`\`\`html. Just output raw HTML elements.`;
    
    const userPrompt = `Please explain this React concept simply:\n\n${cardText}`;
    
    const response = await callGemini(userPrompt, systemPrompt);
    
    // Clean up markdown if present
    const cleanHtml = response.replace(/```html/g, '').replace(/```/g, '').trim();
    
    setExplanation(cleanHtml);
    setLoading(false);
  };

  return (
    <div 
      className={`card ${isAdvanced ? 'advanced' : ''}`} 
      style={fullWidth ? { columnSpan: 'all', display: 'block' } : {}}
      ref={cardRef}
    >
      <h2>
        {title}
        {!fullWidth && (
          <button className="ai-btn" onClick={handleExplain} title="Explain Like I'm 5">
            ✨ ELI5
          </button>
        )}
      </h2>
      
      {children}

      {showExplanation && (
        <div className="ai-response" style={{ display: 'block' }}>
          {loading ? (
            <span className="loading-text">✨ AI Tutor is thinking of a simple explanation...</span>
          ) : (
            <>
              <strong>🤖 Tutor says:</strong><br/>
              <div dangerouslySetInnerHTML={{ __html: explanation }} />
            </>
          )}
        </div>
      )}
    </div>
  );
}
