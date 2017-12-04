const processInput = str => {
    return str.trim().split(/\n/);
};

const level1 = str => {
    let words = str.split(" ");
    return words.length === new Set(words).size;
};

const level2 = str => {
    let words = str.split(" ").map(v =>
        v
            .split("")
            .sort()
            .join()
    );

    return words.length === new Set(words).size;
};

const f = (str, part = 1) => {
    let securityLevel = part === 1 ? level1 : level2;
    let passphrases = processInput(str);

    return passphrases.map(securityLevel).reduce((s, v) => (s = s + v));
};

module.exports = f;
