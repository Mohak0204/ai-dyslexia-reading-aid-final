import React from 'react';
import { Type, Palette, AlignJustify, Gauge, Cpu } from 'lucide-react';

const SettingsPanel = ({
    fontSize, setFontSize,
    lineSpacing, setLineSpacing,
    theme, setTheme,
    difficulty, setDifficulty,
    modelName, setModelName,
    provider, setProvider
}) => {
    return (
        <div className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-md border-b border-indigo-50 dark:border-gray-700 p-6 transition-all shadow-sm relative z-40">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                {/* API Provider Selector - New Section */}
                <div className="flex flex-col gap-3 lg:col-span-4 border-b border-gray-200 dark:border-gray-700 pb-6 mb-2">
                    <label className="flex items-center gap-2 text-lg font-bold text-indigo-600 dark:text-indigo-400">
                        <Cpu className="w-5 h-5" />
                        Choose Your AI Provider
                    </label>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setProvider('gemini')}
                            className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all w-1/2 md:w-auto md:min-w-[200px] ${provider === 'gemini' ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30' : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                        >
                            <span className="font-bold text-gray-800 dark:text-gray-200">Google Gemini</span>
                            <span className="text-xs text-center text-gray-500">Standard, powerful.</span>
                            {provider === 'gemini' && <div className="w-2 h-2 rounded-full bg-indigo-500 mt-1"></div>}
                        </button>

                        <button
                            onClick={() => setProvider('groq')}
                            className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all w-1/2 md:w-auto md:min-w-[200px] ${provider === 'groq' ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/30' : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                        >
                            <span className="font-bold text-gray-800 dark:text-gray-200">Groq (Llama 3)</span>
                            <span className="text-xs text-center text-gray-500">Free, fast, simple.</span>
                            {provider === 'groq' && <div className="w-2 h-2 rounded-full bg-orange-500 mt-1"></div>}
                        </button>
                    </div>
                </div>

                {/* Font Size */}
                <div className="flex flex-col gap-3 group">
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        <Type className="w-4 h-4" />
                        <span>Font Size</span>
                        <span className="ml-auto text-xs font-mono bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded text-gray-500 dark:text-gray-400">{fontSize}px</span>
                    </label>
                    <input
                        type="range"
                        min="14" max="32" step="1"
                        value={fontSize}
                        onChange={(e) => setFontSize(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600 hover:accent-indigo-500 transition-all"
                    />
                </div>

                {/* Line Spacing */}
                <div className="flex flex-col gap-3 group">
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-200 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                        <AlignJustify className="w-4 h-4" />
                        <span>Line Spacing</span>
                        <span className="ml-auto text-xs font-mono bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded text-gray-500 dark:text-gray-400">{lineSpacing}</span>
                    </label>
                    <input
                        type="range"
                        min="1" max="2.5" step="0.1"
                        value={lineSpacing}
                        onChange={(e) => setLineSpacing(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-teal-600 hover:accent-teal-500 transition-all"
                    />
                </div>

                {/* Theme / Background */}
                <div className="flex flex-col gap-3">
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-200">
                        <Palette className="w-4 h-4 text-purple-500" /> Background
                    </label>
                    <div className="flex gap-3">
                        {[
                            { id: 'light', color: 'bg-white border-gray-200', ring: 'ring-indigo-500', label: 'Light' },
                            { id: 'sepia', color: 'bg-[#f4ecd8] border-orange-200', ring: 'ring-orange-500', label: 'Sepia' },
                            { id: 'dark', color: 'bg-gray-900 border-gray-700', ring: 'ring-gray-500', label: 'Dark' },
                        ].map((t) => (
                            <button
                                key={t.id}
                                onClick={() => setTheme(t.id)}
                                className={`w-9 h-9 rounded-full border-2 transition-all transform hover:scale-110 ${t.color} ${theme === t.id ? `ring-2 ${t.ring} ring-offset-2 dark:ring-offset-gray-800 scale-110 shadow-lg` : 'opacity-70 hover:opacity-100'}`}
                                title={t.label}
                            />
                        ))}
                    </div>
                </div>

                {/* AI Difficulty & Model */}
                <div className="flex flex-col gap-3">
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-200">
                        <Gauge className="w-4 h-4 text-pink-500" /> Complexity
                    </label>
                    <div className="relative mb-2">
                        <select
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                            className="w-full pl-3 pr-8 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm font-medium text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all cursor-pointer appearance-none"
                        >
                            <option value="Very Easy">Very Easy (Grade 2)</option>
                            <option value="Easy">Easy (Grade 5)</option>
                            <option value="Medium">Medium (Standard)</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>

                    {/* Model Selector */}
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-200">
                        <Cpu className="w-4 h-4 text-blue-500" /> AI Model
                    </label>
                    <div className="relative">
                        <select
                            value={modelName === 'gemini-1.5-flash' || modelName === 'gemini-2.0-flash' || modelName === 'gemini-1.5-pro' || modelName === 'gemini-pro' ? modelName : 'custom'}
                            onChange={(e) => setModelName(e.target.value === 'custom' ? '' : e.target.value)}
                            className="w-full pl-3 pr-8 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm font-medium text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all cursor-pointer appearance-none"
                        >
                            <option value="gemini-1.5-flash">Gemini 1.5 Flash (Fast)</option>
                            <option value="gemini-2.0-flash">Gemini 2.0 Flash (New)</option>
                            <option value="gemini-1.5-pro">Gemini 1.5 Pro (Powerful)</option>
                            <option value="gemini-pro">Gemini 1.0 Pro (Legacy)</option>
                            <option value="custom">Custom (Manually Enter)</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>

                    {(modelName !== 'gemini-1.5-flash' && modelName !== 'gemini-2.0-flash' && modelName !== 'gemini-1.5-pro' && modelName !== 'gemini-pro') && (
                        <input
                            type="text"
                            placeholder="e.g. gemini-1.5-flash-001"
                            value={modelName}
                            onChange={(e) => setModelName(e.target.value)}
                            className="w-full mt-2 px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    )}
                </div>

            </div>
        </div>
    );
};

export default SettingsPanel;
