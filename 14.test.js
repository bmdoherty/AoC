const f = require("./14");

describe("Day 14", () => {
    // it("part 1 example", () => {
    //     let input = Array.from(Array(256).keys());
    //     let key = "flqrgnkx";
    //     expect(f(input, key)).toEqual(8108);
    // });

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

    it("part 2", () => {
        let input = Array.from(Array(256).keys());
        let key = "stpzcrnm";
        expect(f(input, key, 2)).toEqual(1113);
    });
});
