class Grid {
    constructor() {
        this.cells = [];
        return this;
    }

    add() {
        let [x, y] = coordinates(this.cells.length + 1);
        this.cells.push(new Cell(x, y, this.cellValue(x, y)));

        return this;
    }

    cellValue(x, y) {
        if (x === 0 && y === 0) {
            return 1;
        }
        let value = 0;
        let neighbours = this.neighbours(x, y);

        for (let i = 0; i < neighbours.length; i++) {
            let [x, y] = neighbours[i];
            let neighbour = this.cells.find(
                cell => cell.x === x && cell.y === y
            );
            if (neighbour) {
                value = value + neighbour.value;
            }
        }

        return value;
    }

    lastValue() {
        return this.cells[this.cells.length - 1].value;
    }

    neighbours(x, y) {
        let neighbours = [];

        neighbours.push([x + 1, y]);
        neighbours.push([x + 1, y + 1]);
        neighbours.push([x, y + 1]);
        neighbours.push([x - 1, y + 1]);
        neighbours.push([x - 1, y]);
        neighbours.push([x - 1, y - 1]);
        neighbours.push([x, y - 1]);
        neighbours.push([x + 1, y - 1]);

        return neighbours;
    }
}

class Cell {
    constructor(x, y, value) {
        this.x = x;
        this.y = y;
        this.value = value;

        return this;
    }
}

const coordinates = number => {
    if (number === 1) {
        return [0, 0];
    }
    // (2n+1)^2
    let n = Math.ceil((Math.sqrt(number) - 1) / 2);
    let x = n;
    let y = -n;
    let gridLength = 2 * n + 1;
    let corner = Math.pow(2 * n + 1, 2);
    let stepsBack = corner - number;

    let turns = 0;
    if (stepsBack > gridLength - 1) {
        turns = Math.floor(stepsBack / (gridLength - 1));
    }

    let stepsToLastCorner = turns * (gridLength - 1);
    let finalSteps = stepsBack - stepsToLastCorner;

    switch (turns) {
        case 3:
            y = y + (gridLength - 1) - finalSteps;
            break;
        case 2:
            x = x - (gridLength - 1) + finalSteps;
            y = y + (gridLength - 1);
            break;
        case 1:
            x = x - (gridLength - 1);
            y = y + finalSteps;
            break;
        case 0:
            x = x - finalSteps;
            break;
        default:
            break;
    }

    return [x, y];
};

const f = number => {
    let [x, y] = coordinates(number);

    return Math.abs(x) + Math.abs(y);
};

const f2 = number => {
    let grid = new Grid().add();

    while (grid.lastValue() <= number) {
        grid.add();
    }

    return grid.lastValue();
};

module.exports = { f, f2 };
