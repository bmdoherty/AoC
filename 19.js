const processInput = str => {
    return str.split(/\n/).map(v => v.split(""));
};

const getStart = grid => {
    let height = grid.length;
    let width = grid[0].length;

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            if (grid[x][y] === "|") {
                return [x, y];
            }
        }
    }
};
const trampoline = fn => (...args) => {
    let result = fn(...args);
    while (result instanceof Function) result = result();
    return result;
};

const findPath = (grid, node, direction) => {
    let path = [];
    let seen = {};

    const turn = (grid, x, y, direction) => {
        if (["left", "right"].includes(direction)) {
            if (grid[y - 1][x] != " ") {
                return "up";
            } else {
                return "down";
            }
        } else {
            if (grid[y][x - 1] != " ") {
                return "left";
            } else {
                return "right";
            }
        }
    };

    const move = node => {
        const TURN = "+";
        const END = " ";
        let x = node[1];
        let y = node[0];
        let chr = grid[y][x];
        let i = 0;
        let steps = [];

        while (chr !== END) {
            if (isLetter(chr)) {
                path.push(chr);
            }

            if (chr === TURN) {
                direction = turn(grid, x, y, direction);
            }

            switch (direction) {
                case "up":
                    y = y - 1;
                    break;
                case "down":
                    y = y + 1;
                    break;
                case "left":
                    x = x - 1;
                    break;
                case "right":
                    x = x + 1;
                    break;
                default:
                    break;
            }

            steps.push([x, y]);

            i++;
            chr = grid[y][x];
        }
        return { letters: path.join(""), steps: steps };
    };

    return move(node, direction);
};

const isLetter = chr => {
    if (chr !== "+" && chr !== "|" && chr !== "-" && chr !== " ") {
        return true;
    }
    return false;
};
const f = (str, part = 1) => {
    let grid = processInput(str);
    let start = getStart(grid);

    let { letters, steps } = findPath(grid, start, "down");

    return part === 1 ? letters : steps.length;
};

module.exports = f;
