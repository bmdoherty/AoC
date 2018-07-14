// https://jsfiddle.net/bdoherty/hckz6nds/

// change to your key, this is mine
let key = "stpzcrnm";
// paint delay in ms
let ms = 2;

const extract = (list, length, currentPosition) => {
    let selected = [];

    for (let i = currentPosition; i < currentPosition + length; i++) {
        let index = [i % list.length];
        let item = list[i % list.length];
        list[index] = "X";
        selected.push(item);
    }

    return [selected, list];
};

const insert = (list, reversed, currentPosition) => {
    let l = list.slice(0);
    let r = reversed.slice(0);

    for (let i = currentPosition; i < currentPosition + l.length; i++) {
        let index = i % l.length;

        if (l[index] === "X") {
            l[index] = r.shift();
        }
    }

    return l;
};

const ciruclarSlice = (list, length, currentPosition, skipSize) => {
    let selected = [];
    let rest = [];

    [selected, list] = extract(list, length, currentPosition);
    list = insert(list, selected.reverse(), currentPosition);
    currentPosition = (currentPosition + (length + skipSize)) % list.length;

    return [list, currentPosition];
};

const knotHash = (input, lengths, currentPosition = 0, skipSize = 0) => {
    for (let length of lengths) {
        [input, currentPosition] = ciruclarSlice(input, length, currentPosition, skipSize);
        skipSize++;
    }

    return [input, currentPosition, skipSize];
};

const chunk = (input, size) => {
    let chunked = [];
    for (let i = 0; i < input.length; i = i + size) {
        let tmp = input.slice(i, i + size);
        chunked.push(tmp);
    }

    return chunked;
};
const part1 = (list, lengths) => {
    let [input, currentPosition] = knotHash(list, lengths);

    return input[0] * input[1];
};

const knotHash64 = (input, lengths) => {
    input = input.slice(0);
    const suffix = [17, 31, 73, 47, 23];
    let round = 0;
    let skipSize = 0;
    let currentPosition = 0;

    lengths = lengths
        .toString()
        .split("")
        .map(v => v.charCodeAt(0))
        .concat(suffix);

    while (round < 64) {
        [input, currentPosition, skipSize] = knotHash(input, lengths, currentPosition, skipSize);
        round++;
    }

    let hex = chunk(input, 16)
        .map(v => v.reduce((a, b) => a ^ b))
        .map(v => v.toString(16).padStart(2, "0"))
        .join("");

    return hex;
};

var ctx = document.getElementById("canvas").getContext("2d");
var w = 25;
for (let i = 0; i < 128; i++) {
    for (let j = 0; j < 128; j++) {
        ctx.fillStyle = "white";
        ctx.fillRect(j * w, i * w, w, w);
    }
}
//////////////////////////////////
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

    return regions;
};

const f = (input, key, part = 1) => {
    return part === 1 ? totalUsed(input, key) : totalRegions(input, key);
};
///////////////////////////////////

function paint(ctx, cell, color, ms) {
    fillCell(ctx, cell[0], cell[1], color);
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomColor() {
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    let color = `rgb(${red},${green},${blue})`;

    return `rgb(${red},${green},${blue})`;
}

function fillCell(ctx, x, y, color) {
    let w = 6;
    ctx.fillStyle = color;
    ctx.fillRect(x * w, y * w, w, w);
}

let input = Array.from(Array(256).keys());
let regions = f(input, key, 2, ctx);

async function demo() {
    for (let region of regions) {
        let color = getRandomColor();

        for (let cell of region) {
            await paint(ctx, cell, color, ms);
        }
    }
}

demo();
