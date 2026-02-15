import React, { useState, useRef } from 'react';
import { Sparkles, Upload, FileText, Image, Loader2, RefreshCw } from 'lucide-react';
import Tesseract from 'tesseract.js';
import StatsPanel from './StatsPanel';

const InputArea = ({ input, setInput, onSimplify, isLoading, simplificationMode, setSimplificationMode }) => {
    const [isOCRProcessing, setIsOCRProcessing] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            processOCR(file);
        }
    };

    const processOCR = (file) => {
        setIsOCRProcessing(true);
        Tesseract.recognize(
            file,
            'eng',
            { logger: m => console.log(m) }
        ).then(({ data: { text } }) => {
            setInput(text);
            setIsOCRProcessing(false);
        }).catch(err => {
            console.error(err);
            setIsOCRProcessing(false);
            alert('Failed to extract text from image.');
        });
    };

    return (
        <div className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl shadow-indigo-100/50 dark:shadow-none border border-indigo-50 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-200/50 dark:hover:shadow-none">

            {/* Card Header */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 px-6 py-4 border-b border-indigo-100 dark:border-gray-700 flex justify-between items-center">
                <h2 className="font-bold text-indigo-900 dark:text-white flex items-center gap-2">
                    <div className="p-1.5 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                        <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    Original Text
                </h2>

                {/* Helper Actions */}
                <div className="flex gap-2">
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*, .pdf"
                        onChange={handleFileUpload}
                    />
                    <button
                        onClick={() => fileInputRef.current.click()}
                        className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-300 border border-indigo-100 dark:border-gray-600 hover:bg-indigo-50 dark:hover:bg-gray-600 transition-colors shadow-sm"
                        disabled={isOCRProcessing}
                    >
                        {isOCRProcessing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Image className="w-3.5 h-3.5" />}
                        {isOCRProcessing ? 'Scanning...' : 'OCR Integration'}
                    </button>
                </div>
            </div>

            {/* Input Area */}
            <div className="flex-1 relative group">
                <textarea
                    className="w-full h-full p-6 resize-none bg-transparent focus:bg-indigo-50/30 dark:focus:bg-gray-700/30 outline-none text-lg leading-relaxed text-gray-700 dark:text-gray-200 placeholder-gray-400 transition-colors"
                    placeholder="Paste text here or upload an image to begin..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                {/* Subtle focus indicator ring inside */}
                <div className="absolute inset-0 border-2 border-transparent group-focus-within:border-indigo-100 dark:group-focus-within:border-indigo-900/50 pointer-events-none rounded-b-2xl transition-colors"></div>
            </div>

            {/* Actions Toolbar */}
            <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 flex flex-col gap-4 relative z-10">
                <StatsPanel text={input} isInput={true} />

                <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
                    {/* Mode Selection with Pill Design */}
                    <div className="flex bg-gray-100 dark:bg-gray-700/50 p-1 rounded-xl flex-1 justify-between md:justify-start">
                        {['simplify', 'summarize', 'bullets'].map((mode) => (
                            <button
                                key={mode}
                                onClick={() => setSimplificationMode(mode)}
                                className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-bold capitalize transition-all duration-200 ${simplificationMode === mode
                                        ? 'bg-white dark:bg-gray-600 text-indigo-600 dark:text-indigo-300 shadow-md transform scale-105'
                                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'
                                    }`}
                            >
                                {mode}
                            </button>
                        ))}
                    </div>

                    {/* Main Action Button */}
                    <button
                        onClick={onSimplify}
                        disabled={isLoading || !input.trim()}
                        className={`
                    px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200
                    ${isLoading || !input.trim()
                                ? 'bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed'
                                : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-indigo-200 dark:shadow-none'
                            }
                `}
                    >
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <Sparkles className="w-5 h-5 fill-current" />
                        )}
                        {isLoading ? 'Simplifying...' : 'Simplify Text'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InputArea;
