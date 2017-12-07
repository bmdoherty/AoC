const f = require("./7");
const fs = require("fs");
const { promisify } = require("util");
const readFileAsync = promisify(fs.readFile);

async function myReadfile() {
    data1 = await readFileAsync("./7.1.data.txt", "utf8");
    data2 = await readFileAsync("./7.2.data.txt", "utf8");
}

let data1;
let data2;

describe("Day 7", () => {
    beforeAll(async () => {
        await myReadfile();
    });

    it("part 1 example", async () => {
        expect(f(data1)).toEqual("tknk");
    });

    it("part 1", async () => {
        expect(f(data2)).toEqual("dtacyn");
    });

    it("part 2 example", async () => {
        expect(f(data1, 2)).toEqual(60);
    });

    it("part 2", async () => {
        expect(f(data2, 2)).toEqual(521);
    });
});
