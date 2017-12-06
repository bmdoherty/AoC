const f = require("./6");
const fs = require("fs");
const { promisify } = require("util");
const readFileAsync = promisify(fs.readFile);

async function myReadfile() {
    data = await readFileAsync("./6.data.txt", "utf8");
}

let data;

describe("Day 6", () => {
    beforeAll(async () => {
        await myReadfile();
    });

    it("part 1 example", async () => {
        expect(f(`0\t2\t7\t0`)).toEqual(5);
    });

    it("part 1", async () => {
        expect(f(data)).toEqual(6681);
    });

    it("part 2 example", async () => {
        expect(f(`0\t2\t7\t0`, 2)).toEqual(4);
    });

    it("part 2", async () => {
        expect(f(data, 2)).toEqual(2392);
    });
});
