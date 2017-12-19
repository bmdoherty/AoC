const f = require("./18");
const fs = require("fs");
const { promisify } = require("util");
const readFileAsync = promisify(fs.readFile);

async function myReadfile() {
    data1 = await readFileAsync("./18.1.data.txt", "utf8");
    data2 = await readFileAsync("./18.2.data.txt", "utf8");
    data = await readFileAsync("./18.data.txt", "utf8");
}

let data;
let data1;
let data2;

describe("Day 18", () => {
    beforeAll(async () => {
        await myReadfile();
    });

    it("part 1 example", () => {
        expect(f(data1)).toEqual(4);
    });

    it("part 1", () => {
        expect(f(data)).toEqual(9423);
    });

    it("part 2 example", () => {
        expect(f(data2, 2)).toEqual(3);
    });

    it("part 2", () => {
        expect(f(data, 2)).toEqual(7620);
    });
});
