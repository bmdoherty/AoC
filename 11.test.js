const f = require("./11");
const fs = require("fs");
const { promisify } = require("util");
const readFileAsync = promisify(fs.readFile);

async function myReadfile() {
    data1 = await readFileAsync("./11.1.data.txt", "utf8");
}

let data1;

describe("Day 11", () => {
    beforeAll(async () => {
        await myReadfile();
    });

    it("part 1 example", async () => {
        expect(f("ne,ne,ne")).toEqual(3);
    });

    it("part 1 example", async () => {
        expect(f("ne,ne,sw,sw")).toEqual(0);
    });

    it("part 1 example", async () => {
        expect(f("ne,ne,s,s")).toEqual(2);
    });

    it("part 1 example", async () => {
        expect(f("se,sw,se,sw,sw")).toEqual(3);
    });

    it("part 1", async () => {
        expect(f(data1)).toEqual(743);
    });

    it("part 2", async () => {
        expect(f(data1, 2)).toEqual(1493);
    });
});
