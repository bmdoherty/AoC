const difference = a => {
    return Math.max(...a) - Math.min(...a);
};

const evenlyDivisable = a => {
    let limit = a.length;

    for (let i = 0; i < limit; i++) {
        let x = a[i];

        for (let j = i + 1; j < limit; j++) {
            let y = a[j];

            if (x % y === 0) {
                return x / y;
            }

            if (y % x === 0) {
                return y / x;
            }
        }
    }
};

const processInput = str => {
    return str.split(/\n/).map(v => v.split(/\t/).map(Number));
};

const f = (str, type = "part 1") => {
    let checksum = type === "part 1" ? difference : evenlyDivisable;
    let rows = processInput(str);

    return rows.reduce((sum, row) => sum + checksum(row), 0);
};

module.exports = { f, difference, evenlyDivisable };
