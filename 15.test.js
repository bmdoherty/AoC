const f = require("./15");

describe("Day 14", () => {
    it("part 1 example", () => {
        let a = { start: 65, factor: 16807 };
        let b = { start: 8921, factor: 48271 };

        expect(f(a, b)).toEqual(588);
    });

    // it("part 1", () => {
    //     let input = Array.from(Array(256).keys());
    //     let key = "stpzcrnm";
    //     expect(f(input, key)).toEqual(8250);
    // });

    // it("part 2 example", () => {
    //     let input = Array.from(Array(256).keys());
    //     let key = "flqrgnkx";
    //     expect(f(input, key, 2)).toEqual(1242);
    // });

    // it("part 2 example", async () => {
    //     expect(f(data1, 2)).toEqual(10);
    // });

    // it("part 1", async () => {
    //     expect(f(data2)).toEqual(1316);
    // });

    // it("part 2", async () => {
    //     expect(f(data2, 2)).toEqual(3840052);
    // });
});
