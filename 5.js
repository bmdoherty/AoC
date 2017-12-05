const processInput = str => {
    return str
        .trim()
        .split(/\n/)
        .map(Number);
};

const part1 = n => {
    return n + 1;
};

const part2 = n => {
    return n + (n > 2 ? -1 : 1);
};

const f = (str, part = 1) => {
    let increment = part === 1 ? part1 : part2;
    let maze = processInput(str);

    let steps = 0;
    let i = 0;

    while (maze[i] !== undefined) {
        let n = maze[i];
        maze[i] = increment(n);
        i = i + n;
        steps++;
    }

    return steps;
};

module.exports = f;
