import React, { useMemo } from 'react';
import { Clock, AlignJustify, Type, GraduationCap, TrendingDown } from 'lucide-react';
import { calculateFleschKincaid } from '../utils/readability';

const StatsPanel = ({ text, isInput = false, comparisonText = null }) => {
    const stats = useMemo(() => {
        if (!text) return { words: 0, sentences: 0, time: 0, readability: { score: 0, grade: 'N/A' } };

        // Basic word count
        const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;

        // Basic sentence count
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;

        // Est. reading time (150 wpm)
        const time = Math.ceil(words / 150);

        // Readability
        const readability = calculateFleschKincaid(text);

        return { words, sentences, time, readability };
    }, [text]);

    const comparison = useMemo(() => {
        if (!comparisonText || isInput) return null;
        const prevStats = calculateFleschKincaid(comparisonText);
        const improvement = parseFloat(prevStats.score) - parseFloat(stats.readability.score);
        return {
            prevScore: prevStats.score,
            improvement: improvement.toFixed(1)
        };
    }, [comparisonText, isInput, stats.readability.score]);

    return (
        <div className={`flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium ${isInput ? 'text-gray-500 dark:text-gray-400' : 'text-yellow-800 dark:text-yellow-100/80'} mt-2 px-2`}>
            <div className="flex items-center gap-1" title="Word Count">
                <AlignJustify className="w-3 h-3" />
                <span>{stats.words} words</span>
            </div>
            <div className="flex items-center gap-1" title="Sentence Count">
                <Type className="w-3 h-3" />
                <span>{stats.sentences} sentences</span>
            </div>
            <div className="flex items-center gap-1" title="Estimated Reading Time">
                <Clock className="w-3 h-3" />
                <span>~{stats.time} min read</span>
            </div>

            {/* Readability Score */}
            <div className="flex items-center gap-1 pl-2 border-l border-gray-300 dark:border-gray-600">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Level: {stats.readability.grade}</span>
            </div>

            {/* Improvement Delta (Only for Output) */}
            {comparison && parseFloat(comparison.improvement) > 0 && (
                <div className="flex items-center gap-1 text-green-600 dark:text-green-400 font-bold bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full">
                    <TrendingDown className="w-3 h-3" />
                    <span>Improved by {comparison.improvement} grades</span>
                </div>
            )}
        </div>
    );
};

export default StatsPanel;
