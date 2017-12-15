function* generatorMaker(start, factor, multiple = 1) {
    let previous = start;
    let remainder = 0;
    let divisor = 2147483647;

    while (true) {
        remainder = (previous * factor) % divisor;

        previous = remainder;
        if (remainder % multiple === 0) {
            yield remainder;
        }
    }
}

const matched = (a, b, multiples = false) => {
    let matched = 0;
    let i = 0;
    let pairsRequired;
    let generatorA;
    let generatorB;

    if (multiples) {
        pairsRequired = 5000000;

        generatorA = generatorMaker(a.start, a.factor, 4);
        generatorB = generatorMaker(b.start, b.factor, 8);
    } else {
        pairsRequired = 40000000;

        generatorA = generatorMaker(a.start, a.factor);
        generatorB = generatorMaker(b.start, b.factor);
    }

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
    return part === 1 ? matched(a, b) : matched(a, b, true);
};

module.exports = f;
