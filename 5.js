const processInput = str => {
    return str.trim().split(/\n/);
};

const f = (str, part = 1) => {
    let securityLevel = part === 1 ? level1 : level2;
    let passphrases = processInput(str);

    return true;
};

module.exports = f;
