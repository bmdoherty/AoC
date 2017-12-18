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

const part2 = (limit, step) => {
    let i = 0;
    let position = 0;
    let oneth;

    while (i < limit) {
        i++;
        position = (position + step) % i + 1;
        if (position % i === 1) {
            oneth = i;
        }
    }

    return oneth;
};

const f = (limit, step, part = 1) => {
    // console.log(buffer);
    return part === 1 ? part1(limit, step) : part2(limit, step);
};

module.exports = f;

// console.log(f(50000000, 369));
// (0)
// 0 (1)
// 0 (2) 1
// 0  2 (3) 1
// 0  2 (4) 3  1
// 0 (5) 2  4  3  1
// 0  5  2  4  3 (6) 1
// 0  5 (7) 2  4  3  6  1
// 0  5  7  2  4  3 (8) 6  1
// 0 (9) 5  7  2  4  3  8  6  1
