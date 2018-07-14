const f = require("./12");
const fs = require("fs");
const { promisify } = require("util");
const readFileAsync = promisify(fs.readFile);

async function myReadfile() {
    data1 = await readFileAsync("./12.1.data.txt", "utf8");
    data2 = await readFileAsync("./12.2.data.txt", "utf8");
}

let data1;
let data2;

describe("Day 12", () => {
    beforeAll(async () => {
        await myReadfile();
    });
    it("part 1 example", async () => {
        expect(f(data1)).toEqual(6);
    });

    it("part 2 example", async () => {
        expect(f(data1, 2)).toEqual(2);
    });

    it("part 1", async () => {
        expect(f(data2)).toEqual(169);
    });

    it("part 2", async () => {
        expect(f(data2, 2)).toEqual(179);
    });
});
