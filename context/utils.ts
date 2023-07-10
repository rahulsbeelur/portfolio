export const getValueFromLocalStorage = (key: string, defaultValue: string): string => {
    if (typeof window !== 'undefined') {
        const result = localStorage.getItem(key);
        if (result) {
            return result;
        }
        localStorage.setItem(key, defaultValue);
    }
    return defaultValue;
};

export const setValueToLocalStorage = (key: string, value: string): void => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(key, value);
    }
};
