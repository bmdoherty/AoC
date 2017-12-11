const { parse } = require("./9");
const fs = require("fs");
const { promisify } = require("util");
const readFileAsync = promisify(fs.readFile);

async function myReadfile() {
    data1 = await readFileAsync("./9.1.data.txt", "utf8");
    data2 = await readFileAsync("./9.2.data.txt", "utf8");
}

let data1;
let data2;

describe("Day 9", () => {
    beforeAll(async () => {
        await myReadfile();
    });

    it("part 1 example", async () => {
        expect(parse("<>").stripGarbage().length).toEqual(0);
    });

    it("part 1 example", async () => {
        expect(parse("<random characters>").stripGarbage().length).toEqual(0);
    });

    it("part 1 example", async () => {
        expect(parse("<<<<>").stripGarbage().length).toEqual(0);
    });

    it("part 1 example", async () => {
        expect(parse("<{!>}>").stripGarbage().length).toEqual(0);
    });

    it("part 1 example", async () => {
        expect(parse("<!!>").stripGarbage().length).toEqual(0);
    });

    it("part 1 example", async () => {
        expect(parse("<!!!>>").stripGarbage().length).toEqual(0);
    });

    it("part 1 example", async () => {
        expect(parse('<{o"i!a,<{i<a>').stripGarbage().length).toEqual(0);
    });

    it("part 1 example", async () => {
        expect(parse('<{o"i!a,<{i<a>').stripGarbage().length).toEqual(0);
    });

    it("part 1 example", async () => {
        expect(
            parse("{}")
                .stripGarbage()
                .groups()
        ).toEqual(1);
    });

    it("part 1 example", async () => {
        expect(
            parse("{{{}}}")
                .stripGarbage()
                .groups()
        ).toEqual(3);
    });

    it("part 1 example", async () => {
        expect(
            parse("{{},{}}")
                .stripGarbage()
                .groups()
        ).toEqual(3);
    });

    it("part 1 example", async () => {
        expect(
            parse("{{{},{},{{}}}}")
                .stripGarbage()
                .groups()
        ).toEqual(6);
    });

    it("part 1 example", async () => {
        expect(
            parse("{<{},{},{{}}>}")
                .stripGarbage()
                .groups()
        ).toEqual(1);
    });

    it("part 1 example", async () => {
        expect(
            parse("{<a>,<a>,<a>,<a>}")
                .stripGarbage()
                .groups()
        ).toEqual(1);
    });

    it("part 1 example", async () => {
        expect(
            parse("{{<a>},{<a>},{<a>},{<a>}}")
                .stripGarbage()
                .groups()
        ).toEqual(5);
    });

    it("part 1 example", async () => {
        expect(
            parse("{{<!>},{<!>},{<!>},{<a>}}")
                .stripGarbage()
                .groups()
        ).toEqual(2);
    });

    it("part 1 example", async () => {
        expect(
            parse("{}")
                .stripGarbage()
                .score()
        ).toEqual(1);
    });

    it("part 1 example", async () => {
        expect(
            parse("{{{}}}")
                .stripGarbage()
                .score()
        ).toEqual(6);
    });

    it("part 1 example", async () => {
        expect(
            parse("{{},{}}")
                .stripGarbage()
                .score()
        ).toEqual(5);
    });

    it("part 1 example", async () => {
        expect(
            parse("{{{},{},{{}}}}")
                .stripGarbage()
                .score()
        ).toEqual(16);
    });

    it("part 1 example", async () => {
        expect(
            parse("{<a>,<a>,<a>,<a>}")
                .stripGarbage()
                .score()
        ).toEqual(1);
    });

    it("part 1 example", async () => {
        expect(
            parse("{{<ab>},{<ab>},{<ab>},{<ab>}}")
                .stripGarbage()
                .score()
        ).toEqual(9);
    });

    it("part 1 example", async () => {
        expect(
            parse("{{<!!>},{<!!>},{<!!>},{<!!>}}")
                .stripGarbage()
                .score()
        ).toEqual(9);
    });

    it("part 1 example", async () => {
        expect(
            parse("{{<a!>},{<a!>},{<a!>},{<ab>}}")
                .stripGarbage()
                .score()
        ).toEqual(3);
    });

    it("part 1", async () => {
        expect(
            parse(data1)
                .stripGarbage()
                .score()
        ).toEqual(12803);
    });

    it("part 1 example", async () => {
        expect(parse("<> <!<>").garbage().length).toEqual(0);
    });

    it("part 1 example", async () => {
        expect(parse("<random characters>").garbage().length).toEqual(17);
    });

    it("part 1 example", async () => {
        expect(parse("<<<<>").garbage().length).toEqual(3);
    });

    it("part 1 example", async () => {
        expect(parse("<{!>}>").garbage().length).toEqual(2);
    });

    it("part 1 example", async () => {
        expect(parse("<{!>}>    <{!>}>    <{!>}>").garbage().length).toEqual(6);
    });

    it("part 1 example", async () => {
        expect(parse("<!!>").garbage().length).toEqual(0);
    });

    it("part 1 example", async () => {
        expect(parse('<{o"i!a,<{i<a>').garbage().length).toEqual(10);
    });

    it("part 1 example", async () => {
        expect(parse('<{o"i!a,<{i<a>,,,{}<{o"i!a,<{i<a>').garbage().length).toEqual(20);
    });

    it("part 1 example", async () => {
        expect(parse(data1).garbage().length).toEqual(6425);
    });
});

// 6425
