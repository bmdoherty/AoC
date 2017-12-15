function* generatorMaker(start, factor) {
    let current = start;
    let divisor = 2147483647;

    while (true) {
        current = start * factor / divisor;
        yield start * factor;
    }
}
// Generator A starts with 116
// Generator B starts with 299

// The generators both work on the same principle. To create its next value, a generator will take the previous value it produced,
// multiply it by a factor (generator A uses 16807; generator B uses 48271),
// and then keep the remainder of dividing that resulting product by 2147483647. That final remainder is the value it produces next.

// --Gen. A--  --Gen. B--
// 1092455   430625591
// 1181022009  1233683848
// 245556042  1431495498
// 1744312007   137874439
// 1352636452   285222916

const matched = (a, b) => {
    let generatorA = generatorMaker(a.start, a.factor);

    return 5;
};

const f = (a, b, part = 1) => {
    return part === 1 ? matched(a, b) : totalRegions(input, key);
};

module.exports = f;
