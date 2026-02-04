export const storage = {
    get: (key, defaultValue = []) => {
        try {
            return JSON.parse(localStorage.getItem(key)) || defaultValue;
        } catch {
            return defaultValue;
        }
    },

    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error("LocalStorage set error:", e);
        }
    },

    addUnique: (key, item) => {
        const arr = storage.get(key);
        if (!arr.includes(item)) {
            arr.push(item);
            storage.set(key, arr);
        }
    }
};
