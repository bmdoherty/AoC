const f = require("./8");
const fs = require("fs");
const { promisify } = require("util");
const readFileAsync = promisify(fs.readFile);

async function myReadfile() {
    data1 = await readFileAsync("./8.1.data.txt", "utf8");
    data2 = await readFileAsync("./8.2.data.txt", "utf8");
}

let data1;
let data2;

describe("Day 8", () => {
    beforeAll(async () => {
        await myReadfile();
    });

    it("part 1 example", async () => {
        expect(f(data1)).toEqual(1);
    });

    it("part 1", async () => {
        expect(f(data2)).toEqual(3745);
    });

    it("part 2 example", async () => {
        expect(f(data1, 2)).toEqual(10);
    });

    it("part 2", async () => {
        expect(f(data2, 2)).toEqual(4644);
    });
});
