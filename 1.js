const adder = offset => {
    return (accumulator, value, index, array) => {
        let digit = array[(index + offset) % array.length];

        if (value === digit) {
            accumulator = accumulator + value;
        }

        return accumulator;
    };
};

const f = (str, type = "part 1") => {
    let offset = 1;

    if (type === "part 2") {
        offset = str.length / 2;
    }

    return str
        .split("")
        .map(Number)
        .reduce(adder(offset), 0);
};

module.exports = f;
