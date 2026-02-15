export const calculateFleschKincaid = (text) => {
    if (!text || text.trim().length === 0) return { score: 0, grade: 'N/A' };

    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length || 1;
    const words = text.trim().split(/\s+/).length || 1;

    // Syllable heuristic: 
    // 1. Remove non-alphabetic characters
    // 2. Split by vowels (aeiouy), roughly
    // 3. Handle special cases like trailing 'e'
    const syllables = text.trim().split(/\s+/).reduce((count, word) => {
        return count + countSyllables(word);
    }, 0) || 1;

    // Flesch-Kincaid Grade Level Formula
    // 0.39 * (total words / total sentences) + 11.8 * (total syllables / total words) - 15.59
    const grade = 0.39 * (words / sentences) + 11.8 * (syllables / words) - 15.59;

    // Clamp to reasonable values (0-18)
    const clampedGrade = Math.max(0, Math.min(18, grade));

    return {
        score: clampedGrade.toFixed(1),
        grade: getGradeLabel(clampedGrade)
    };
};

const countSyllables = (word) => {
    word = word.toLowerCase().replace(/[^a-z]/g, '');
    if (word.length <= 3) return 1;

    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
    word = word.replace(/^y/, '');

    const syllables = word.match(/[aeiouy]{1,2}/g);
    return syllables ? syllables.length : 1;
};

const getGradeLabel = (score) => {
    if (score < 1) return 'Kindergarten';
    if (score < 6) return `Grade ${Math.floor(score)} (Easy)`;
    if (score < 9) return `Grade ${Math.floor(score)} (Average)`;
    if (score < 13) return `Grade ${Math.floor(score)} (High School)`;
    return `Grade ${Math.floor(score)} (College+)`;
};
