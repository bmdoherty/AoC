const f = require("./13");
const fs = require("fs");
const { promisify } = require("util");
const readFileAsync = promisify(fs.readFile);

async function myReadfile() {
    data1 = await readFileAsync("./13.1.data.txt", "utf8");
    data2 = await readFileAsync("./13.2.data.txt", "utf8");
}

let data1;
let data2;

describe("Day 12", () => {
    beforeAll(async () => {
        await myReadfile();
    });

    it("part 1 example", async () => {
        expect(f(data1)).toEqual(24);
    });

    it("part 2 example", async () => {
        expect(f(data1, 2)).toEqual(10);
    });

    it("part 1", async () => {
        expect(f(data2)).toEqual(1316);
    });

    it("part 2", async () => {
        expect(f(data2, 2)).toEqual(3840052);
    });
});
