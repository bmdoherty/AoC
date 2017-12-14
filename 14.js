const { knotHash64, chunk } = require("./10");

const Hex2Bin = n => {
    return parseInt(n, 16)
        .toString(2)
        .padStart(4, "0");
};

const totalUsed = (input, key) => {
    let totalUsed = 0;
    let row = 0;
    let grid = [];

    while (row < 128) {
        let hex = knotHash64(input, `${key}-${row}`);
        r = chunk(hex, 1)
            .map(Hex2Bin)
            .join("")
            .split("");

        grid.push(r);

        row++;
    }

    totalUsed = grid.map(row => row.map(Number).reduce((s, x) => s + x, 0)).reduce((s, x) => s + x, 0);

    return totalUsed;
};

// .map(Number)
// .reduce((s, x) => s + x, 0);

const part2 = (list, lengths) => {
    let [input, currentPosition] = knotHash(list, lengths);

    return input[0] * input[1];
};

const f = (input, key, part = 1) => {
    return part === 1 ? totalUsed(input, key) : part2(list, lengths);
};

module.exports = f;
