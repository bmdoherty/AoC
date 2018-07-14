const START_GARBAGE = Symbol("START_GARBAGE");
const END_GARBAGE = Symbol("END_GARBAGE");
const START_GROUP = Symbol("START_GROUP");
const END_GROUP = Symbol("END_GROUP");
const NEGATE = Symbol("NEGATE");
const PROGRAM = Symbol("PROGRAM");
const GARBAGE = Symbol("GARBAGE");

const controls = {
    "<": START_GARBAGE,
    ">": END_GARBAGE,
    "{": START_GROUP,
    "}": END_GROUP,
    "!": NEGATE
};

class ParsedObject {
    constructor(str) {
        this.str = str;

        this.machine = {
            [PROGRAM]: {
                [START_GARBAGE]: [GARBAGE, GARBAGE],
                [END_GARBAGE]: [GARBAGE, PROGRAM],
                [START_GROUP]: [PROGRAM, PROGRAM],
                [END_GROUP]: [PROGRAM, PROGRAM],
                [NEGATE]: [PROGRAM, PROGRAM]
            },
            [GARBAGE]: {
                [START_GARBAGE]: [GARBAGE, GARBAGE],
                [END_GARBAGE]: [GARBAGE, PROGRAM],
                [START_GROUP]: [GARBAGE, GARBAGE],
                [END_GROUP]: [GARBAGE, GARBAGE],
                [NEGATE]: [GARBAGE, GARBAGE]
            }
        };

        this.meta = [];

        let state = PROGRAM;
        let negate;
        for (let chr of str) {
            let data = { chr: chr, prevState: state, nextState: state };

            if (controls[chr] && !negate) {
                if (controls[chr] === NEGATE) {
                    data.negate = true;
                    negate = true;
                    data.state = state;
                } else {
                    [data.state, state] = this.processControl(state, controls[chr]);
                    data.nextState = state;
                }
            } else {
                if (negate) {
                    negate = false;
                    data.negated = true;
                }
                data.state = state;
            }

            this.meta.push(data);
        }

        return this;
    }

    stripGarbage() {
        let stripped = this.meta.filter(v => v.state !== GARBAGE);
        let s = stripped.map(v => v.chr).join("");

        return new ParsedObject(s);
    }

    get length() {
        return this.str.length;
    }

    groups() {
        let groups = 0;
        let nesting = 0;

        for (let data of this.meta) {
            if (controls[data.chr] === START_GROUP) {
                groups++;
                nesting++;
            }
            if (controls[data.chr] === END_GROUP) {
                nesting--;
            }
        }

        return groups;
    }

    score() {
        let groups = 0;
        let nesting = 0;
        let score = 0;

        for (let data of this.meta) {
            if (controls[data.chr] === START_GROUP) {
                score = score + (nesting + 1);
                groups++;
                nesting++;
            }
            if (controls[data.chr] === END_GROUP) {
                nesting--;
            }
        }

        return score;
    }

    garbage() {
        let stripped = this.meta
            .filter(v => v.state === GARBAGE) // it is garbage
            .filter(v => !v.negate) // !
            .filter(v => !v.negated) // what is negated
            .filter(v => v.prevState !== PROGRAM) // not <
            .filter(v => v.nextState !== PROGRAM); // not >

        let s = stripped.map(v => v.chr).join("");

        return new ParsedObject(s);
    }

    processControl(state, input) {
        if (this.machine[state][input]) {
            return this.machine[state][input];
        }
    }
}

const parse = str => {
    let parsed = new ParsedObject(str);

    return parsed;
};

module.exports = { parse };
