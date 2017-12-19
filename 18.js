class Program {
    constructor(id, instructions, input = [], output = [], part = 1) {
        this.id = id;
        this.register = {};
        this.instructions = instructions;
        this.i = 0;
        this.input = input;
        this.output = output;
        this._played = [];
        this._sent = 0;
        this._state = "running";

        this.fn = {
            snd: this.snd,
            set: this.set,
            add: this.add,
            mod: this.mod,
            mul: this.mul,
            rcv: this.rcv,
            jgz: this.jgz
        };

        if (part === 2) {
            this.register["p"] = id;
            this.fn["snd"] = this.send;
            this.fn["rcv"] = this.recieve;
        }
    }

    get sent() {
        return this._sent;
    }

    set sent(sent) {
        return (this._sent = sent);
    }

    getOutput() {
        return this.output;
    }

    getInput() {
        return this.input;
    }

    get state() {
        return this._state;
    }

    set state(state) {
        return (this._state = state);
    }

    set lastPlayed(x) {
        this._played.push(x);
    }

    get lastPlayed() {
        return this._played[this._played.length - 1];
    }

    getValue(x) {
        if (isNaN(parseInt(x, 10))) {
            return this.register[x];
        } else {
            return parseInt(x, 10);
        }
    }

    snd(x, y) {
        this.lastPlayed = this.register[x];

        this.i++;
    }

    send(x, y) {
        this.state = "send";
        this.sent++;
        this.output.push(this.getValue(x));

        this.i++;
    }

    set(x, y) {
        this.state = "set";
        this.register[x] = this.getValue(y);

        this.i++;
    }

    add(x, y) {
        this.state = "add";
        this.register[x] = this.getValue(x) + this.getValue(y);

        this.i++;
    }

    mul(x, y) {
        this.state = "mul";
        this.register[x] = this.getValue(x) * this.getValue(y);

        this.i++;
    }

    mod(x, y) {
        this.state = "mod";
        this.register[x] = this.getValue(x) % this.getValue(y);

        this.i++;
    }

    rcv(x, y) {
        if (this.register[x] !== 0) {
            this.state = "rcv";
        }

        this.i++;
    }

    recieve(x, y) {
        if (this.input.length === 0) {
            this.state = "rcv";
        } else {
            this.state = "running";
            this.register[x] = this.getValue(this.input.shift());
            this.i++;
        }
    }

    jgz(x, y) {
        y = this.getValue(y);
        x = this.getValue(x);

        let step = 1;
        if (x > 0) {
            step = y;
        }

        this.i = this.i + step;
    }

    tick() {
        let instruction = this.instructions[this.i];

        if (isNaN(parseInt(instruction.register, 10))) {
            if (this.register[instruction.register] === undefined) {
                this.register[instruction.register] = 0;
            }
        }

        let fn = this.fn[instruction.fn].bind(this);
        fn(instruction.register, instruction.value);
    }
}

const processInput = str => {
    return str
        .trim()
        .split(/\n/)
        .map(v => v.split(" "))
        .map(v => {
            let value = null;
            if (v[2]) {
                value = v[2];
            }
            return {
                fn: v[0],
                register: v[1],
                value: value
            };
        });
};

const part1 = str => {
    let instructions = processInput(str);
    let program1 = new Program(1, instructions);

    while (program1.state !== "rcv") {
        program1.tick();
    }

    return program1.lastPlayed;
};

const part2 = str => {
    let instructions = processInput(str);
    let messages0to1 = [];
    let messages1to0 = [];
    let program0 = new Program(0, instructions, messages1to0, messages0to1, 2);
    let program1 = new Program(1, instructions, messages0to1, messages1to0, 2);
    let deadlocked = false;

    while (!deadlocked) {
        if (program0.state === "rcv" && program1.state === "rcv") {
            deadlocked = true;
        } else {
            program0.tick();
            program1.tick();
        }
    }

    return program1.sent;
};

const f = (str, part = 1) => {
    return part === 1 ? part1(str) : part2(str);
};

module.exports = f;
