import React from 'react';
import { Activity, Clock, Gauge, Zap } from 'lucide-react';

const ReadingInsights = ({ timeSpent, wpm, difficulty }) => {
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}m ${secs}s`;
    };

    return (
        <div className="bg-white/50 dark:bg-gray-700/30 border border-teal-100 dark:border-gray-600 rounded-xl p-4 mt-6 backdrop-blur-sm transition-all hover:bg-white/80 dark:hover:bg-gray-700/50">
            <h3 className="text-xs font-bold text-teal-800 dark:text-teal-200 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Activity className="w-3.5 h-3.5" />
                Adaptive Reading Insights
            </h3>

            <div className="grid grid-cols-3 gap-3">
                {/* Time Spent */}
                <div className="bg-white dark:bg-gray-800 p-2.5 rounded-lg border border-teal-50 dark:border-gray-600 shadow-sm flex flex-col items-center justify-center text-center group hover:border-teal-200 transition-colors">
                    <Clock className="w-4 h-4 text-blue-500 mb-1.5 group-hover:scale-110 transition-transform" />
                    <span className="text-xl font-black text-gray-800 dark:text-gray-100 leading-none">
                        {formatTime(timeSpent)}
                    </span>
                    <span className="text-[10px] font-medium text-gray-400 dark:text-gray-500 uppercase mt-1">Session</span>
                </div>

                {/* WPM */}
                <div className="bg-white dark:bg-gray-800 p-2.5 rounded-lg border border-teal-50 dark:border-gray-600 shadow-sm flex flex-col items-center justify-center text-center group hover:border-teal-200 transition-colors">
                    <Zap className="w-4 h-4 text-amber-500 mb-1.5 group-hover:scale-110 transition-transform" />
                    <span className="text-xl font-black text-gray-800 dark:text-gray-100 leading-none">
                        {Math.round(wpm)}
                    </span>
                    <span className="text-[10px] font-medium text-gray-400 dark:text-gray-500 uppercase mt-1">Avg WPM</span>
                </div>

                {/* Difficulty */}
                <div className="bg-white dark:bg-gray-800 p-2.5 rounded-lg border border-teal-50 dark:border-gray-600 shadow-sm flex flex-col items-center justify-center text-center group hover:border-teal-200 transition-colors">
                    <Gauge className="w-4 h-4 text-emerald-500 mb-1.5 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-bold text-gray-800 dark:text-gray-100 leading-none py-1">
                        {difficulty || 'Medium'}
                    </span>
                    <span className="text-[10px] font-medium text-gray-400 dark:text-gray-500 uppercase mt-1">Level</span>
                </div>
            </div>
        </div>
    );
};

export default ReadingInsights;
