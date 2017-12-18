const f = require("./16");
const fs = require("fs");
const { promisify } = require("util");
const readFileAsync = promisify(fs.readFile);

async function myReadfile() {
    data1 = await readFileAsync("./16.1.data.txt", "utf8");
}

let data1;

describe("Day 16", () => {
    beforeAll(async () => {
        await myReadfile();
    });

    it("part 1 example", () => {
        let line = ["a", "b", "c", "d", "e"];
        let dance = ["s1", "x3/4", "pe/b"];

        expect(f(line, dance)).toEqual("baedc");
    });

    it("part 1", async () => {
        let line = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p"];
        let dance = data1.split(",");

        expect(f(line, dance)).toEqual("cgpfhdnambekjiol");
    });

    it("part 2", async () => {
        let line = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p"];
        let dance = data1.split(",");

        expect(f(line, dance, 2)).toEqual("gjmiofcnaehpdlbk");
    });
});
