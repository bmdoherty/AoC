const f = require("./17");

describe("Day 17", () => {
    it("part 1 example", () => {
        expect(f(9, 3)).toEqual(5);
    });

    it("part 1 example", () => {
        expect(f(2017, 3)).toEqual(638);
    });

    it("part 1", () => {
        expect(f(2017, 369)).toEqual(1547);
    });

    it("part 1", () => {
        expect(f(50000000, 369, 2)).toEqual(31154878);
    });
});
