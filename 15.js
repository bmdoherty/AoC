// const bigInt = require("big-integer");

function* generatorMaker(start, factor) {
    let previous = start;
    let remainder = 0;
    let divisor = 2147483647;

    while (true) {
        remainder = (previous * factor) % divisor;

        previous = remainder;
        yield remainder;
    }
}

function lowest16Bits(dec) {
    return dec
        .toString(2)
        .padStart(32, "0")
        .slice(16);
}

const matched = (a, b) => {
    let matched = 0;
    let pairsRequired = 40000000;
    let i = 0;

    let generatorA = generatorMaker(a.start, a.factor);
    let generatorB = generatorMaker(b.start, b.factor);

    const mask = (1 << 16) - 1;

    while (i <= pairsRequired) {
        let a = generatorA.next().value;
        let b = generatorB.next().value;

        if ((a & mask) === (b & mask)) {
            matched++;
        }

        i++;
    }

    return matched;
};

const f = (a, b, part = 1) => {
    return part === 1 ? matched(a, b) : totalRegions(input, key);
};

module.exports = f;
