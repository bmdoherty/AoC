const extract = (list, length, currentPosition) => {
    let selected = [];

    for (let i = currentPosition; i < currentPosition + length; i++) {
        let index = [i % list.length];
        let item = list[i % list.length];
        list[index] = "X";
        selected.push(item);
    }

    return [selected, list];
};

const insert = (list, reversed, currentPosition) => {
    let l = list.slice(0);
    let r = reversed.slice(0);

    for (let i = currentPosition; i < currentPosition + l.length; i++) {
        let index = i % l.length;

        if (l[index] === "X") {
            l[index] = r.shift();
        }
    }

    return l;
};

const ciruclarSlice = (list, length, currentPosition, skipSize) => {
    let selected = [];
    let rest = [];

    [selected, list] = extract(list, length, currentPosition);
    list = insert(list, selected.reverse(), currentPosition);
    currentPosition = (currentPosition + (length + skipSize)) % list.length;

    return [list, currentPosition];
};

const knotHash = (input, lengths, currentPosition = 0, skipSize = 0) => {
    for (let length of lengths) {
        [input, currentPosition] = ciruclarSlice(input, length, currentPosition, skipSize);
        skipSize++;
    }

    return [input, currentPosition, skipSize];
};

const chunk = (input, size) => {
    let chunked = [];
    for (let i = 0; i < input.length; i = i + size) {
        let tmp = input.slice(i, i + size);
        chunked.push(tmp);
    }

    return chunked;
};
const part1 = (list, lengths) => {
    let [input, currentPosition] = knotHash(list, lengths);

    return input[0] * input[1];
};

const knotHash64 = (input, lengths) => {
    input = input.slice(0);
    const suffix = [17, 31, 73, 47, 23];
    let round = 0;
    let skipSize = 0;
    let currentPosition = 0;

    lengths = lengths
        .toString()
        .split("")
        .map(v => v.charCodeAt(0))
        .concat(suffix);

    while (round < 64) {
        [input, currentPosition, skipSize] = knotHash(input, lengths, currentPosition, skipSize);
        round++;
    }

    let hex = chunk(input, 16)
        .map(v => v.reduce((a, b) => a ^ b))
        .map(v => v.toString(16).padStart(2, "0"))
        .join("");

    return hex;
};

const f = (list, lengths, part = 1) => {
    return part === 1 ? part1(list, lengths) : knotHash64(list, lengths);
};

module.exports = { f, knotHash64, chunk };
