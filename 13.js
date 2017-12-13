const processInput = str => {
    return str
        .trim()
        .split(/\n/)
        .map(v => v.split(": "))
        .map(v => {
            return {
                depth: parseInt(v[0], 10),
                range: parseInt(v[1], 10)
            };
        });
};

const isCaught = (delay = 0) => {
    return scanner => {
        if ((scanner.depth + delay) % (2 * (scanner.range - 1)) == 0) {
            return true;
        }
        return false;
    };
};

const part1 = scanners => {
    return scanners
        .filter(isCaught(0))
        .map(v => v.depth * v.range)
        .reduce((s, v) => s + v, 0);
};

const part2 = scanners => {
    let delay = 0;

    while (scanners.filter(isCaught(delay)).length) {
        delay++;
    }
    return delay;
};

const f = (str, part = 1) => {
    let scanners = processInput(str);

    return part === 1 ? part1(scanners) : part2(scanners);
};

module.exports = f;
