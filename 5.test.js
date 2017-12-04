const fs = require("fs");
const { promisify } = require("util");
const f = require("./4");
const readFileAsync = promisify(fs.readFile);

async function myReadfile() {
    content = await readFileAsync("./4.data.txt", "utf8");
}

let content;

describe("Day 5", () => {
    beforeAll(async () => {
        await myReadfile();
    });

    it("part 1", async () => {
        expect(f(content)).toEqual(455);
    });

    it("part 2", async () => {
        expect(f(content, 2)).toEqual(186);
    });
});
