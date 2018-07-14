const part1 = (limit, step) => {
    let i = 0;
    let position = 0;
    let buffer = [0];

    while (i < limit) {
        i++;
        position = (position + step) % buffer.length + 1;
        buffer = [...buffer.slice(0, position), i, ...buffer.slice(position)];
    }

    return buffer[++position];
};

const part2 = (limit, step, watchedIndex) => {
    let i = 0;
    let position = 0;
    let watchedIndexValue;

    while (i < limit) {
        i++;
        position = (position + step) % i + 1;
        if (position % i === watchedIndex) {
            watchedIndexValue = i;
        }
    }

    return watchedIndexValue;
};

const f = (limit, step, part = 1) => {
    return part === 1 ? part1(limit, step) : part2(limit, step, 1);
};

module.exports = f;
