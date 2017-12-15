const f = require("./15");

describe("Day 15", () => {
    it("part 1 example", () => {
        let a = { start: 65, factor: 16807 };
        let b = { start: 8921, factor: 48271 };

        expect(f(a, b)).toEqual(588);
    });

    it("part 1", () => {
        let a = { start: 116, factor: 16807 };
        let b = { start: 299, factor: 48271 };

        expect(f(a, b)).toEqual(569);
    });

    it("part 2 example", () => {
        let a = { start: 65, factor: 16807 };
        let b = { start: 8921, factor: 48271 };

        expect(f(a, b, 2)).toEqual(309);
    });

    it("part 2", () => {
        let a = { start: 116, factor: 16807 };
        let b = { start: 299, factor: 48271 };

        expect(f(a, b, 2)).toEqual(298);
    });
});
