import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Bot, Sparkles, Brain, Sliders } from 'lucide-react';

const HowAIHelps = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-full bg-white dark:bg-gray-800 border border-purple-100 dark:border-purple-900/50 rounded-2xl shadow-sm overflow-hidden mt-8 mb-4 transition-all hover:shadow-md">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-800 hover:from-purple-100 hover:to-pink-100 dark:hover:from-gray-700 dark:hover:to-gray-700 transition-all duration-300"
            >
                <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                        <Bot className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <span className="font-bold text-purple-900 dark:text-purple-100">How AI Helps</span>
                </div>
                {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-purple-500" />
                ) : (
                    <ChevronDown className="w-5 h-5 text-purple-500" />
                )}
            </button>

            {isOpen && (
                <div className="p-6 grid gap-8 md:grid-cols-3 text-sm text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800/50">

                    {/* Analysis */}
                    <div className="flex flex-col gap-3 group">
                        <div className="flex items-center gap-2 font-bold text-gray-900 dark:text-gray-100">
                            <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-md group-hover:bg-blue-200 transition-colors">
                                <Brain className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            Analyze
                        </div>
                        <p className="leading-relaxed pl-1 border-l-2 border-blue-100 dark:border-blue-900 pl-3">
                            The AI evaluates text to identify complex sentence structures and vocabulary that may present challenges.
                        </p>
                    </div>

                    {/* Simplification */}
                    <div className="flex flex-col gap-3 group">
                        <div className="flex items-center gap-2 font-bold text-gray-900 dark:text-gray-100">
                            <div className="p-1.5 bg-amber-100 dark:bg-amber-900/30 rounded-md group-hover:bg-amber-200 transition-colors">
                                <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                            </div>
                            Rewrite
                        </div>
                        <p className="leading-relaxed pl-1 border-l-2 border-amber-100 dark:border-amber-900 pl-3">
                            It rewrites content using straightforward language, ensuring the original meaning is preserved while enhancing readability.
                        </p>
                    </div>

                    {/* Adaptation */}
                    <div className="flex flex-col gap-3 group">
                        <div className="flex items-center gap-2 font-bold text-gray-900 dark:text-gray-100">
                            <div className="p-1.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-md group-hover:bg-emerald-200 transition-colors">
                                <Sliders className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            Adapt
                        </div>
                        <p className="leading-relaxed pl-1 border-l-2 border-emerald-100 dark:border-emerald-900 pl-3">
                            The system dynamically adjusts complexity based on your difficulty level, providing a personalized experience.
                        </p>
                    </div>

                </div>
            )}
        </div>
    );
};

export default HowAIHelps;
