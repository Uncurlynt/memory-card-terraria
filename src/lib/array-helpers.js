export const extractRandomBatch = (sourceArray, size) => {
    if (!sourceArray) return [];
    const copy = Array.from(sourceArray);
    for (let i = copy.length - 1; i > 0; i--) {
        const rnd = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[rnd]] = [copy[rnd], copy[i]];
    }
    return copy.slice(0, size);
};

export const randomizeOrder = (list) => {
    const output = [...list];
    output.sort(() => Math.random() - 0.5);
    return output;
};