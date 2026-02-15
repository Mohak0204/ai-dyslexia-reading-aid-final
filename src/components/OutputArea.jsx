import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Copy, Check, Eye, Play, Pause, Square, Settings } from 'lucide-react';
import StatsPanel from './StatsPanel';
import ReadingInsights from './ReadingInsights';

const OutputArea = ({ output, input, fontSize, lineSpacing, difficulty }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [copied, setCopied] = useState(false);
    const [bionicMode, setBionicMode] = useState(false);
    const [readingSpeed, setReadingSpeed] = useState(1);
    const [currentSentenceIndex, setCurrentSentenceIndex] = useState(-1);
    const [timeSpent, setTimeSpent] = useState(0);

    const utteranceRef = useRef(null);
    const sentencesRef = useRef([]);
    const timerRef = useRef(null);

    useEffect(() => {
        if (output) {
            const matches = output.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [];
            sentencesRef.current = matches.map(s => s.trim());
        } else {
            sentencesRef.current = [];
        }
    }, [output]);

    useEffect(() => {
        if (isPlaying && !isPaused) {
            timerRef.current = setInterval(() => {
                setTimeSpent(prev => prev + 1);
            }, 1000);
        } else {
            clearInterval(timerRef.current);
        }
        return () => clearInterval(timerRef.current);
    }, [isPlaying, isPaused]);

    useEffect(() => {
        return () => {
            window.speechSynthesis.cancel();
            clearInterval(timerRef.current);
        };
    }, []);

    const speak = () => {
        if (!output) return;

        if (isPaused) {
            window.speechSynthesis.resume();
            setIsPaused(false);
            setIsPlaying(true);
            return;
        }

        if (isPlaying) return;

        window.speechSynthesis.cancel();
        speakSentence(0);
    };

    const speakSentence = (index) => {
        if (index >= sentencesRef.current.length) {
            setIsPlaying(false);
            stateReset();
            return;
        }

        setCurrentSentenceIndex(index);
        const text = sentencesRef.current[index];
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = readingSpeed;

        utterance.onend = () => {
            speakSentence(index + 1);
        };

        utterance.onerror = (e) => {
            console.error("TTS Error", e);
            setIsPlaying(false);
        };

        utteranceRef.current = utterance;
        setIsPlaying(true);
        window.speechSynthesis.speak(utterance);
    };

    const stateReset = () => {
        setCurrentSentenceIndex(-1);
        setIsPlaying(false);
        setIsPaused(false);
    }

    const handlePause = () => {
        window.speechSynthesis.pause();
        setIsPaused(true);
        setIsPlaying(false);
    };

    const handleStop = () => {
        window.speechSynthesis.cancel();
        stateReset();
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const renderBionic = (text) => {
        if (!text) return null;
        return text.split(' ').map((word, index) => {
            const mid = Math.ceil(word.length / 2);
            return (
                <span key={index} className="mr-1 inline-block">
                    <span className="font-bold text-gray-900 dark:text-teal-200">{word.slice(0, mid)}</span>
                    <span className="opacity-80">{word.slice(mid)}</span>
                </span>
            );
        });
    };

    const currentWPM = 150 * readingSpeed;

    if (!output) {
        return (
            <div className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl shadow-teal-50/50 dark:shadow-none border border-teal-50 dark:border-gray-700 items-center justify-center text-gray-400 p-8 text-center transition-all duration-300">
                <div className="w-16 h-16 bg-teal-50 dark:bg-gray-700/50 rounded-full flex items-center justify-center mb-4">
                    <Volume2 className="w-8 h-8 text-teal-200 dark:text-gray-600" />
                </div>
                <p className="font-medium text-lg text-gray-400 dark:text-gray-500">Simplified reading experience awaits</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl shadow-teal-100/50 dark:shadow-none overflow-hidden border border-teal-50 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl hover:shadow-teal-200/50 dark:hover:shadow-none">

            {/* Header */}
            <div className="bg-gradient-to-r from-teal-50 to-green-50 dark:from-gray-700 dark:to-gray-700 px-6 py-4 border-b border-teal-100 dark:border-gray-600 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <h2 className="font-bold text-teal-900 dark:text-teal-100 flex items-center gap-2">
                        <div className="p-1.5 bg-white dark:bg-gray-600 rounded-lg shadow-sm">
                            <Check className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                        </div>
                        AI-Simplified Output
                    </h2>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setBionicMode(!bionicMode)}
                            className={`p-2 rounded-lg transition-all ${bionicMode ? 'bg-teal-100 text-teal-700 ring-2 ring-teal-200' : 'bg-white dark:bg-gray-600 text-gray-500 dark:text-gray-300 hover:bg-teal-50 dark:hover:bg-gray-500'}`}
                            title="Toggle Bionic Reading"
                        >
                            <Eye className="w-5 h-5" />
                        </button>
                        <button
                            onClick={handleCopy}
                            className="p-2 rounded-lg bg-white dark:bg-gray-600 text-gray-500 dark:text-gray-300 hover:bg-teal-50 dark:hover:bg-gray-500 transition-colors"
                            title="Copy Text"
                        >
                            {copied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* TTS Controls */}
                <div className="flex items-center gap-4 bg-white/60 dark:bg-gray-800/50 p-2.5 rounded-xl border border-teal-100 dark:border-gray-500 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                        {!isPlaying && !isPaused ? (
                            <button onClick={speak} className="w-8 h-8 flex items-center justify-center bg-teal-600 text-white rounded-full hover:bg-teal-700 shadow-sm shadow-teal-200 dark:shadow-none transition-all" title="Play">
                                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                            </button>
                        ) : isPaused ? (
                            <button onClick={speak} className="w-8 h-8 flex items-center justify-center bg-teal-600 text-white rounded-full hover:bg-teal-700 shadow-sm shadow-teal-200 dark:shadow-none transition-all" title="Resume">
                                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                            </button>
                        ) : (
                            <button onClick={handlePause} className="w-8 h-8 flex items-center justify-center bg-amber-500 text-white rounded-full hover:bg-amber-600 shadow-sm shadow-amber-200 dark:shadow-none transition-all" title="Pause">
                                <Pause className="w-3.5 h-3.5 fill-current" />
                            </button>
                        )}

                        <button onClick={handleStop} className="w-8 h-8 flex items-center justify-center text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors" title="Stop">
                            <Square className="w-3.5 h-3.5 fill-current" />
                        </button>
                    </div>

                    <div className="h-5 w-px bg-teal-100 dark:bg-gray-600 mx-1"></div>

                    <div className="flex items-center gap-3 flex-1">
                        <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                            <Settings className="w-3.5 h-3.5" />
                            <span className="text-xs font-semibold uppercase tracking-wide">Speed</span>
                        </div>
                        <input
                            type="range"
                            min="0.5"
                            max="2"
                            step="0.1"
                            value={readingSpeed}
                            onChange={(e) => setReadingSpeed(parseFloat(e.target.value))}
                            className="flex-1 accent-teal-600 h-1.5 bg-teal-100 dark:bg-gray-600 rounded-full appearance-none cursor-pointer"
                        />
                        <span className="text-xs font-mono w-8 text-right text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-gray-700 px-1.5 py-0.5 rounded">{readingSpeed}x</span>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div
                className="flex-1 w-full p-8 overflow-y-auto leading-relaxed bg-white dark:bg-gray-800"
                style={{ fontSize: `${fontSize}px`, lineHeight: lineSpacing }}
            >
                {bionicMode ? (
                    <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                        {(sentencesRef.current.length > 0 ? sentencesRef.current : [output]).map((part, i) => (
                            <span
                                key={i}
                                className={`inline-block mr-1 transition-colors duration-300 px-1 rounded-md ${i === currentSentenceIndex ? 'bg-teal-100 dark:bg-teal-900/40 text-teal-900 dark:text-teal-100' : ''}`}
                            >
                                {renderBionic(part)}{' '}
                            </span>
                        ))}
                    </div>
                ) : (
                    <div className="whitespace-pre-wrap text-gray-800 dark:text-gray-100">
                        {(sentencesRef.current.length > 0 ? sentencesRef.current : [output]).map((part, i) => (
                            <span
                                key={i}
                                className={`inline-block mr-1 transition-colors duration-300 px-1 rounded-md ${i === currentSentenceIndex ? 'bg-teal-100 dark:bg-teal-900/40 text-teal-900 dark:text-teal-100 transform scale-[1.01] origin-left shadow-sm shadow-teal-100/50' : ''}`}
                            >
                                {part}{' '}
                            </span>
                        ))}
                    </div>
                )}

                <ReadingInsights
                    timeSpent={timeSpent}
                    wpm={currentWPM}
                    difficulty={difficulty}
                />
            </div>

            {/* Footer Stats */}
            <div className="bg-gray-50 dark:bg-gray-800/80 px-6 py-3 border-t border-gray-100 dark:border-gray-700">
                <StatsPanel text={output} isInput={false} comparisonText={input} />
            </div>
        </div>
    );
};

export default OutputArea;
