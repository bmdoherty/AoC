const processInput = str => {
    return str
        .trim()
        .split(/\n/)
        .map((v, i, a) => {
            let command = v.split(" if")[0].split(" ");
            let condition = v
                .split(" if")[1]
                .trim()
                .split(" ");

            command = {
                var: command[0],
                operator: command[1],
                int: parseInt(command[2], 10)
            };

            condition = {
                var: condition[0],
                operator: condition[1],
                value: parseInt(condition[2], 10)
            };

            return {
                command: command,
                condition: condition
            };
        });
};

const checkCondition = (registers, condition) => {
    return eval(`registers['${condition.var}'] ${condition.operator} ${condition.value}`);
};

const evaluateCommand = (registers, command) => {
    let register = `registers['${command.var}']`;

    switch (command.operator) {
        case "inc":
            expression = `${register} = ${register} + ${command.int}`;
            break;
        case "dec":
            expression = `${register} = ${register} - ${command.int}`;
            break;
        default:
            break;
    }

    eval(expression);
};

const initialise = (registers, instructions) => {
    instructions.forEach((v, i, a) => {
        registers[v.command.var] = 0;
        registers[v.condition.var] = 0;
    });
};

const max = registers => {
    let max = 0;

    for (let [key, value] of Object.entries(registers)) {
        if (value > max) {
            max = value;
        }
    }

    return max;
};

const f = (str, part = 1) => {
    let instructions = processInput(str);
    let absoluteMax = 0;
    let registers = {};

    initialise(registers, instructions);

    for (let instruction of instructions) {
        if (checkCondition(registers, instruction.condition)) {
            evaluateCommand(registers, instruction.command);

            if (max(registers) > absoluteMax) {
                absoluteMax = max(registers);
            }
        }
    }

    return part === 1 ? max(registers) : absoluteMax;
};

module.exports = f;
