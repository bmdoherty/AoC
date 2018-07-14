const s = (line, n) => {
    let start = line.slice(line.length - n);
    let end = line.slice(0, line.length - n);

    return [...start, ...end];
};

const x = (line, a, b) => {
    let tmpA = line[a];
    line[a] = line[b];
    line[b] = tmpA;

    return line;
};

const p = (line, a, b) => {
    let indexA = line.findIndex(it => it === a);
    let indexB = line.findIndex(it => it === b);

    return x(line, indexA, indexB);
};

const fn = {
    s: s,
    x: x,
    p: p
};

const f = (line, dance, part = 1) => {
    let i = 0;
    let limit = part === 1 ? 1 : 1000000000;
    let seen = [];

    while (i < limit && !seen.includes(line.join(""))) {
        seen.push(line.join(""));
        for (step of dance) {
            let arr = step.split("");
            let key = arr.shift();
            let args = arr.join("").split("/");

            line = fn[key](line, ...args);
        }
        i++;
    }

    return part === 1 ? line.join("") : seen[limit % i];
};

module.exports = f;
