const processInput = str => {
    return str
        .trim()
        .split("\t")
        .map(Number);
};

const spread = step => {
    step = step.slice(0);
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
    let terminator;
    const fn = (step, steps = []) => {
        if (contains(step, steps)) {
            terminator = step;
            return;
        } else {
            steps.push(step);
            fn(spread(step), steps);
        }

        return steps;
    };
    return [fn(step), terminator];
};

const contains = (step, steps) => {
    return JSON.stringify(steps).indexOf(JSON.stringify(step)) > -1;
};

const loopStart = (step, steps) => {
    let i = JSON.stringify(steps).indexOf(JSON.stringify(step));
    let s = JSON.stringify(steps).slice(0, i - 1) + "]"; //hack saves some seconds

    return JSON.parse(s).length;
};

const f = (str, part = 1) => {
    let array = processInput(str);
    let [steps, terminator] = redistribute(array);

    return part === 1
        ? steps.length
        : steps.length - loopStart(terminator, steps);
};

module.exports = f;
