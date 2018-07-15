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

const getRegion = (grid, x, y) => {
    let region = [];
    let seenInRegion = {};
    // console.log(`x:${x} y:${y}`);
    const checkCell = (x, y) => {
        let key = `${x}:${y}`;

        if (seenInRegion[key]) {
            return;
        }
        seenInRegion[key] = true;

        // if (x === 5 && y === 0) {
        //     console.log(grid[0].slice(0, 8).join(" "));
        //     console.log(`x:${x} y:${y} used:${grid[y][x]}`);
        // }

        if (grid[y][x] !== 1) {
            return;
        } else {
            region.push([x, y]);
            // console.log(region);

            if (y < 127) {
                checkCell(x, y + 1); // check bottom
            }

            if (y > 0) {
                checkCell(x, y - 1); // check top
            }

            if (x > 0) {
                checkCell(x - 1, y); // check left
            }

            if (x < 127) {
                checkCell(x + 1, y); // check right
            }
        }

        return region;
    };

    return checkCell(x, y);
};
const totalUsed = (input, key) => {
    let grid = makeGrid(128, input, key);

    return grid.map(row => row.reduce((s, x) => s + x, 0)).reduce((s, x) => s + x, 0);
};

const totalRegions = (input, key) => {
    let grid = makeGrid(128, input, key);
    let regions = [];
    let seen = {};

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid.length; x++) {
            let key = `${x}:${y}`;

            if (!seen[key]) {
                // console.log(key);
                if (grid[y][x] === 1) {
                    //regions;
                    let region = getRegion(grid, x, y);
                    region.forEach(it => {
                        let key = `${it[0]}:${it[1]}`;
                        seen[key] = true;
                    });

                    regions.push(region);
                }
            }
        }
    }

    //console.log(regions[0]);
    return regions.length;
};

const f = (input, key, part = 1) => {
    return part === 1 ? totalUsed(input, key) : totalRegions(input, key);
};

module.exports = f;

let input = Array.from(Array(256).keys());
let key = "stpzcrnm";
f(input, key, 2);
