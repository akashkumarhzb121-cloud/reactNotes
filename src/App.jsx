// react-notes/src/App.jsx
import { useState, useEffect } from 'react';
import mermaid from 'mermaid';
import Header from './components/Header';
import NotesList from './components/NotesList';
import { callGemini } from './utils/gemini';

function App() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [quizContent, setQuizContent] = useState(null);
  const [loadingQuiz, setLoadingQuiz] = useState(false);

  // Initialize Mermaid diagrams
  useEffect(() => {
    mermaid.initialize({ 
      startOnLoad: true, 
      theme: 'base',
      themeVariables: {
          primaryColor: '#e0f2fe',
          primaryTextColor: '#0f172a',
          primaryBorderColor: '#7dd3fc',
          lineColor: '#94a3b8',
          secondaryColor: '#fef08a',
          tertiaryColor: '#fbcfe8'
      }
    });
    mermaid.contentLoaded();
  }, []);

  const generateQuiz = async () => {
    setLoadingQuiz(true);
    setQuizContent(null);

    // Grab a sample of notes from the DOM to base the quiz on
    const allCards = Array.from(document.querySelectorAll('.card'));
    const shuffledCards = allCards.sort(() => 0.5 - Math.random()).slice(0, 5);
    const sampleText = shuffledCards.map(c => c.innerText).join('\n---\n');

    const systemPrompt = `You are an expert React interviewer and tutor. 
    Based ONLY on the provided notes context, generate a 3-question multiple choice pop quiz to test the user's knowledge.
    Format the output strictly in HTML. For each question, provide:
    1. The Question in a <h3> tag.
    2. A list of 4 options (A, B, C, D) using a <ul>.
    3. The correct answer hidden inside a <details><summary>Reveal Answer</summary><p>Correct Answer: [Letter] - [Brief Explanation]</p></details> block so the user can guess before seeing it.
    Do NOT use markdown. Do NOT wrap in \`\`\`html. Return pure HTML.`;

    const userPrompt = `Here are the study notes:\n\n${sampleText}`;

    const quizHtml = await callGemini(userPrompt, systemPrompt);
    const cleanQuiz = quizHtml.replace(/```html/g, '').replace(/```/g, '').trim();
    
    setQuizContent(cleanQuiz);
    setLoadingQuiz(false);
  };

  const handleStartQuiz = () => {
    setIsQuizOpen(true);
    if (!quizContent) {
      generateQuiz();
    }
  };

  return (
    <>
      <button className="floating-btn ai-quiz-btn" onClick={handleStartQuiz}>
        ✨ Pop Quiz
      </button>
      <button className="floating-btn print-btn" onClick={() => window.print()}>
        🖨️ Print Notes
      </button>

      <Header />
      <NotesList />

      {/* Quiz Modal */}
      {isQuizOpen && (
        <div className="modal-overlay" onClick={(e) => e.target.className === 'modal-overlay' && setIsQuizOpen(false)}>
          <div className="modal-content">
            <button className="modal-close" onClick={() => setIsQuizOpen(false)}>&times;</button>
            <h2 className="modal-title">✨ Pop Quiz Generator</h2>
            
            {!quizContent && !loadingQuiz && (
               <p>Test your knowledge! Our AI will analyze your notes and generate 3 quick questions to help you study.</p>
            )}

            {loadingQuiz && (
               <div style={{ textAlign: 'center', padding: '30px' }}>
                 <span className="loading-text">✨ Scanning your notes and generating questions...</span>
               </div>
            )}

            {quizContent && (
              <>
                <div dangerouslySetInnerHTML={{ __html: quizContent }} />
                <button 
                  className="floating-btn" 
                  style={{ position: 'static', background: '#64748b', marginTop: '20px' }}
                  onClick={generateQuiz}
                >
                  🔄 Generate Another Quiz
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
