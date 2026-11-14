import fs from 'fs';

const WORDS_PER_MINUTE = 200;

export interface ReadingTime {
    minutes: number;
    seconds: number;
    label: string;
}

export const getReadingTime = (filePath: string, isQuickRead = false): ReadingTime => {
    const source = fs
        .readFileSync(filePath, 'utf8')
        .replace(/^---[\s\S]*?---\s*/m, '')
        .replace(/```[\s\S]*?```/g, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/[#[\]_*`>|-]/g, ' ');
    const words = source.trim().split(/\s+/).filter(Boolean).length;
    const totalSeconds = Math.max(10, Math.round((words / WORDS_PER_MINUTE) * 60));
    const minutes = Math.max(1, Math.ceil(totalSeconds / 60));

    return {
        minutes,
        seconds: totalSeconds,
        label: isQuickRead && totalSeconds < 60 ? `${totalSeconds} sec read` : `${minutes} min read`
    };
};
