const processInput = str => {
    return str
        .trim()
        .split(/\n/)
        .map(v => v.split(""));
};

const f = (str, part = 1) => {
    let grid = processInput(str);
    return part === 1 ? true : false;
};

module.exports = f;
