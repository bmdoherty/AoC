const f = require("./10");
const fs = require("fs");
const { promisify } = require("util");
const readFileAsync = promisify(fs.readFile);

async function myReadfile() {
    data1 = await readFileAsync("./10.1.data.txt", "utf8");
}

let data1;

describe("Day 10", () => {
    beforeAll(async () => {
        await myReadfile();
    });

    it("part 1 example", async () => {
        let list = [0, 1, 2, 3, 4];
        let lengths = [3, 4, 1, 5];
        expect(f(list, lengths)).toEqual(12);
    });

    it("part 1", async () => {
        let list = Array.from(Array(256).keys());
        let lengths = data1.split(",").map(Number);

        expect(f(list, lengths)).toEqual(3770);
    });

    it("part 2", async () => {
        let input = Array.from(Array(256).keys());
        let lengths = "";
        expect(f(input, lengths, 2)).toEqual("a2582a3a0e66e6e86e3812dcb672a272");
    });

    it("part 2", async () => {
        let input = Array.from(Array(256).keys());
        let lengths = "AoC 2017";
        expect(f(input, lengths, 2)).toEqual("33efeb34ea91902bb2f59c9920caa6cd");
    });

    it("part 2", async () => {
        let input = Array.from(Array(256).keys());
        let lengths = "1,2,3";
        expect(f(input, lengths, 2)).toEqual("3efbe78a8d82f29979031a4aa0b16a9d");
    });

    it("part 2", async () => {
        let input = Array.from(Array(256).keys());
        let lengths = "1,2,4";
        expect(f(input, lengths, 2)).toEqual("63960835bcdc130f0b66d7ff4f6a5a8e");
    });

    it("part 2", async () => {
        let input = Array.from(Array(256).keys());
        let lengths = data1;
        expect(f(input, lengths, 2)).toEqual("a9d0e68649d0174c8756a59ba21d4dc6");
    });
});
