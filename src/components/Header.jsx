import React from 'react';
import { Type, Moon, Sun, Monitor, Settings, Key } from 'lucide-react';

const Header = ({ font, setFont, theme, setTheme, textSize, setTextSize, apiKey, setApiKey }) => {
    return (
        <header className="sticky top-0 z-50 p-4 border-b border-indigo-100/50 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4 bg-white/80 dark:bg-gray-900/90 backdrop-blur-md transition-colors shadow-sm">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-200 dark:shadow-none">
                    Ax
                </div>
                <div>
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-300">
                        Dyslexia Reader
                    </h1>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wide">AI ASSISTED READING</p>
                </div>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-3">
                {/* API Key Input (Compact) */}
                <div className="relative group">
                    <Key className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                    <input
                        type="password"
                        placeholder="Gemini API Key"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        className="pl-9 pr-3 py-1.5 text-sm rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all w-32 focus:w-48"
                    />
                </div>

                <div className="h-6 w-px bg-gray-200 dark:bg-gray-700"></div>

                {/* Font Toggle */}
                <div className="flex bg-gray-100 dark:bg-gray-800 rounded-full p-1 border border-gray-200 dark:border-gray-700">
                    <button
                        onClick={() => setFont('sans')}
                        className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${font === 'sans' ? 'bg-white dark:bg-gray-700 shadow text-indigo-600 dark:text-indigo-400' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                    >
                        Sans
                    </button>
                    <button
                        onClick={() => setFont('dyslexic')}
                        className={`px-3 py-1 rounded-full text-xs font-dyslexic transition-all ${font === 'dyslexic' ? 'bg-yellow-100 dark:bg-yellow-900/30 shadow text-yellow-800 dark:text-yellow-200' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                    >
                        Dyslexic
                    </button>
                </div>

                {/* Theme Toggles */}
                <div className="flex gap-1">
                    <button
                        onClick={() => setTheme('light')}
                        className={`p-2 rounded-full transition-all ${theme === 'light' ? 'bg-indigo-100 text-indigo-600' : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500'}`}
                        title="Light Mode"
                    >
                        <Sun className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setTheme('sepia')}
                        className={`p-2 rounded-full transition-all ${theme === 'sepia' ? 'bg-[#f4ecd8] text-[#5b4636] ring-1 ring-[#5b4636]/20' : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500'}`}
                        title="Sepia Mode"
                    >
                        <Monitor className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setTheme('dark')}
                        className={`p-2 rounded-full transition-all ${theme === 'dark' ? 'bg-gray-800 text-indigo-400 ring-1 ring-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500'}`}
                        title="Dark Mode"
                    >
                        <Moon className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
