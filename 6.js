const processInput = str => {
    return str
        .trim()
        .split("\t")
        .map(Number);
};

const spread = step => {
    let max = step.reduce((a, b) => Math.max(a, b));
    let block = step.indexOf(max);

    step[block] = 0;
    for (let i = block + 1; max > 0; i++) {
        step[i % step.length]++;
        max--;
    }

    return step;
};

const redistribute = step => {
    let start;
    let end;
    let lookup = {};
    let cycles = 1;

    const fn = step => {
        let key = step.join("-");

        if (lookup[key]) {
            start = lookup[key] - 1;
            end = cycles - 1;

            return;
        } else {
            lookup[key] = cycles++;

            // thunked??
            // http://www.thinkingincrowd.me/2016/06/06/How-to-avoid-Stack-overflow-error-on-recursive/
            var op = fn;
            while (op != null && typeof op === "function") {
                op = op(spread(step));
            }
        }

        return [start, end];
    };

    return fn(step);
};

const f = (str, part = 1) => {
    let array = processInput(str);
    let [start, end] = redistribute(array);

    return part === 1 ? end : end - start;
};

module.exports = f;
