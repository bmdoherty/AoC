const processInput = str => {
    return str.trim().split(/\n/);
};

const f = (str, part = 1) => {
    let instructions = processInput(str);

    return part === 1 ? true : false;
};

module.exports = f;
