const f = require("./5");
const fs = require("fs");
const { promisify } = require("util");
const readFileAsync = promisify(fs.readFile);

async function myReadfile() {
    data = await readFileAsync("./5.data.txt", "utf8");
}

let data;

describe("Day 5", () => {
    beforeAll(async () => {
        await myReadfile();
    });

    it("part 1 example", async () => {
        expect(f(`0\n3\n0\n1\n-3`)).toEqual(5);
    });

    it("part 1", async () => {
        expect(f(data)).toEqual(354121);
    });

    it("part 2 example", async () => {
        expect(f(`0\n3\n0\n1\n-3`, 2)).toEqual(10);
    });

    it("part 2", async () => {
        expect(f(data, 2)).toEqual(27283023);
    });
});
