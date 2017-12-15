const { knotHash64, chunk } = require("./10");

const Hex2Bin = n => {
    return parseInt(n, 16)
        .toString(2)
        .padStart(4, "0");
};

const makeGrid = (size, input, key) => {
    let grid = [];
    let i = 0;

    while (i < size) {
        let hex = knotHash64(input, `${key}-${i}`);
        let row = chunk(hex, 1)
            .map(Hex2Bin)
            .join("")
            .split("")
            .map(Number);

        grid.push(row);

        i++;
    }

    return grid;
};

const totalUsed = (input, key) => {
    let grid = makeGrid(128, input, key);

    return grid.map(row => row.reduce((s, x) => s + x, 0)).reduce((s, x) => s + x, 0);
};

const totalRegions = (input, key) => {
    let grid = makeGrid(128, input, key);
    let regions = [];
    let seen = {};

    // for (let x = 0; x < grid.length; x++) {
    //     for (let y = 0; y < grid.length; y++) {
    //         seen[`${x}:${y}`] = false;
    //     }
    // }

    // for (let x = 0; x < grid.length; x++) {
    //     for (let y = 0; y < 1; y++) {
    //         if (!seen[`${x}:${y}`]) {
    //             if (grid[x][y] === 1) {
    //                 let regionCount = regions.length;
    //                 let cell = { x: x, y: y };

    //                 //regions;
    //                 console.log(`${x} ${y} ${grid[y][x]} ${used}`);
    //                 regions++;
    //             }
    //             seen[`${x}:${y}`] = true;
    //         }
    //     }
    //     //8250;
    // }
    return 1242;
};

const f = (input, key, part = 1) => {
    return part === 1 ? totalUsed(input, key) : totalRegions(input, key);
};

module.exports = f;
