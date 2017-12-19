const f = require("./19");
const fs = require("fs");
const { promisify } = require("util");
const readFileAsync = promisify(fs.readFile);

async function myReadfile() {
    data1 = await readFileAsync("./19.1.data.txt", "utf8");
    data = await readFileAsync("./19.data.txt", "utf8");
}

let data;
let data1;

describe("Day 19", () => {
    beforeAll(async () => {
        await myReadfile();
    });

    it("part 1 example", () => {
        expect(f(data1)).toEqual("ABCDEF");
    });

    it("part 1", () => {
        expect(f(data)).toEqual("MKXOIHZNBL");
    });

    it("part 2", () => {
        expect(f(data, 2)).toEqual(17872);
    });
});
