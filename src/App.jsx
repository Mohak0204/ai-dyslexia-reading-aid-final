import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import InputArea from './components/InputArea';
import OutputArea from './components/OutputArea';
import SettingsPanel from './components/SettingsPanel';
import HowAIHelps from './components/HowAIHelps';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Settings2 } from 'lucide-react';

function App() {
  const [font, setFont] = useState('sans'); // 'sans' | 'dyslexic'
  const [theme, setTheme] = useState('light'); // 'light' | 'sepia' | 'dark'
  const [textSize, setTextSize] = useState(18);
  const [lineSpacing, setLineSpacing] = useState(1.6);
  const [difficulty, setDifficulty] = useState('Medium');
  const [apiKey, setApiKey] = useState('');
  const [modelName, setModelName] = useState('gemini-1.5-flash');

  // Missing states restored
  const [showSettings, setShowSettings] = useState(false);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [simplificationMode, setSimplificationMode] = useState('simplify');

  // New State for API Provider
  const [provider, setProvider] = useState('gemini'); // 'gemini' | 'groq'

  // Apply theme class to html element
  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove('dark', 'sepia');
    if (theme === 'dark') {
      html.classList.add('dark');
    } else if (theme === 'sepia') {
      html.classList.add('sepia');
    }
  }, [theme]);

  const handleSimplify = async () => {
    if (!apiKey) {
      alert(`Please enter a ${provider === 'gemini' ? 'Google Gemini' : 'Groq'} API Key first.`);
      return;
    }
    if (!input.trim()) return;

    setIsLoading(true);
    try {
      let difficultyInstruction = "";
      switch (difficulty) {
        case 'Very Easy':
          difficultyInstruction = "Target a 2nd-grade reading level. Use extremely simple words. Sentences must be under 8 words.";
          break;
        case 'Easy':
          difficultyInstruction = "Target a 5th-grade reading level. Use common vocabulary. Sentences must be under 12 words.";
          break;
        case 'Medium':
        default:
          difficultyInstruction = "Target an 8th-grade reading level. Clear, standard English. Sentences around 15 words.";
          break;
      }

      let promptInstructions = "";
      switch (simplificationMode) {
        case 'summarize':
          promptInstructions = "Summarize the text in a concise way. Focus on the main ideas.";
          break;
        case 'bullets':
          promptInstructions = "Convert the text into a bulleted list of key points.";
          break;
        case 'simplify':
        default:
          promptInstructions = `Simplify the text specifically for a reader with dyslexia.
          Strictly follow these rules:
          1. ${difficultyInstruction}
          2. Use active voice/verbs (e.g., "The cat sat on the mat" NOT "The mat was sat on by the cat").
          3. Break large blocks of text into smaller paragraphs with clear topic sentences.
          4. Maintain the original meaning and tone, but reduce cognitive load.`;
          break;
      }

      const fullPrompt = `Task: ${promptInstructions}\n\nOriginal Text:\n"${input}"`;

      let text = "";

      if (provider === 'gemini') {
        // --- GOOGLE GEMINI API ---
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: modelName || 'gemini-1.5-flash' });
        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        text = response.text();

      } else if (provider === 'groq') {
        // --- GROQ API (Llama 3) ---
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            messages: [{ role: 'user', content: fullPrompt }],
            model: 'llama-3.3-70b-versatile', // Updated to latest supported model
          })
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(`Groq API Error: ${errData.error?.message || response.statusText}`);
        }

        const data = await response.json();
        text = data.choices[0]?.message?.content || "No response generated.";
      }

      setOutput(text);
    } catch (error) {
      console.error("API Error:", error);
      let errorMessage = `Error: Could not simplify text using ${provider === 'gemini' ? 'Gemini' : 'Groq'}.`;

      if (error.message) {
        if (error.message.includes('403') || error.message.includes('401')) errorMessage = "Error: Invalid API Key. Please check your key.";
        else if (error.message.includes('404')) errorMessage = "Error (404): Model not found. Select a different model or provider.";
        else if (error.message.includes('429')) errorMessage = "Error (429): Rate limit exceeded. Please wait a moment.";
        else errorMessage = `Error: ${error.message}`;
      }

      setOutput(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const fontClass = font === 'dyslexic' ? 'font-dyslexic' : 'font-sans';
  const themeStyles = theme === 'sepia'
    ? { backgroundColor: '#f4ecd8', color: '#5b4636', minHeight: '100vh' }
    : { minHeight: '100vh' };

  return (
    <div
      style={themeStyles}
      className={`transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 text-gray-900'} ${fontClass}`}
    >
      <Header
        font={font} setFont={setFont}
        theme={theme} setTheme={setTheme}
        textSize={textSize} setTextSize={setTextSize}
        apiKey={apiKey} setApiKey={setApiKey}
        provider={provider} // Using prop might need update in Header too, but ignoring purely visual there for now
      />

      {/* Settings Toggle Bar */}
      <div className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="w-full py-2 flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <Settings2 className="w-4 h-4" />
          {showSettings ? 'Hide Personalization' : 'Show Personalization & Difficulty'}
        </button>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <SettingsPanel
          fontSize={textSize} setFontSize={setTextSize}
          lineSpacing={lineSpacing} setLineSpacing={setLineSpacing}
          theme={theme} setTheme={setTheme}
          difficulty={difficulty} setDifficulty={setDifficulty}
          modelName={modelName} setModelName={setModelName}
          provider={provider} setProvider={setProvider}
        />
      )}

      <main className="container mx-auto p-4 md:p-6 lg:p-8 h-[calc(100vh-140px)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
          <InputArea
            input={input}
            setInput={setInput}
            onSimplify={handleSimplify}
            isLoading={isLoading}
            simplificationMode={simplificationMode}
            setSimplificationMode={setSimplificationMode}
          />
          <OutputArea
            output={output}
            input={input}
            fontSize={textSize}
            lineSpacing={lineSpacing}
            difficulty={difficulty}
          />
        </div>

        <HowAIHelps />
      </main>
    </div>
  );
}

export default App;
