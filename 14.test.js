const f = require("./14");

describe("Day 14", () => {
    it("part 1 example", () => {
        let input = Array.from(Array(256).keys());
        let key = "flqrgnkx";
        expect(f(input, key)).toEqual(8108);
    });

    it("part 1", () => {
        let input = Array.from(Array(256).keys());
        let key = "stpzcrnm";
        expect(f(input, key)).toEqual(8250);
    });

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
