const processInput = str => {
    return str.trim().split(",");
};

const hexDistance = (pointA, pointB) => {
    let dx = pointB[0] - pointA[0];
    let dy = pointB[1] - pointA[1];

    let dd = dy - dx;
    return Math.max(Math.abs(dx), Math.abs(dy), Math.abs(dd));
};

function* walkMap(steps) {
    let i = 0;

    let x = 0;
    let y = 0;

    yield [x, y];

    while (i < steps.length) {
        let step = steps[i];

        switch (step) {
            case "nw":
                x--;
                yield [x, y];
                break;
            case "n":
                y++;
                yield [x, y];
                break;
            case "ne":
                x++;
                y++;
                yield [x, y];
                break;
            case "se":
                x++;
                yield [x, y];
                break;
            case "s":
                y--;
                yield [x, y];
                break;
            case "sw":
                x--;
                y--;
                yield [x, y];

                break;

            default:
                break;
        }
        i++;
    }
}

const f = (str, part = 1) => {
    let steps = processInput(str);
    let walk = walkMap(steps);
    let maxDistance = 0;

    for (var position of walk) {
        if (hexDistance(position, [0, 0]) > maxDistance) {
            maxDistance = hexDistance(position, [0, 0]);
        }
    }

    return part === 1 ? hexDistance(position, [0, 0]) : maxDistance;
};

module.exports = f;
