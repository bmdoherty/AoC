const processInput = str => {
    return str
        .trim()
        .split(/\n/)
        .map(Number);
};

const part1 = n => {
    return 1;
};

const part2 = n => {
    return 2;
};

const f = (str, part = 1) => {
    let solver = part === 1 ? part1 : part2;
    let array = processInput(str);

    return solver(array);
};

module.exports = f;
