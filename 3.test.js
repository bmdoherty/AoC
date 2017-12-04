const { f, f2 } = require("./3");

test("Data from square 1 is carried 0 steps, since it's at the access port.", () => {
    expect(f(1)).toBe(0);
});

test("3 is 2 steps", () => {
    expect(f(3)).toBe(2);
});

test("7 is 2 steps", () => {
    expect(f(7)).toBe(2);
});

test("5 is 2 steps", () => {
    expect(f(5)).toBe(2);
});

test("7 is 2 steps", () => {
    expect(f(9)).toBe(2);
});

test("Data from square 12 is carried 3 steps, such as: down, left, left.", () => {
    expect(f(12)).toBe(3);
});

test("15 is 2 steps", () => {
    expect(f(15)).toBe(2);
});

test("18 is 2 steps", () => {
    expect(f(18)).toBe(3);
});

test("Data from square 23 is carried only 2 steps: up twice.", () => {
    expect(f(23)).toBe(2);
});

test("Data from square 1024 must be carried 31 steps.", () => {
    expect(f(1024)).toBe(31);
});

test("Part 1 answer", () => {
    expect(f(265149)).toBe(438);
});

test("Square 1 starts with the value 1", () => {
    expect(f2(1)).toBe(2);
});

test("Square 5 only has the first and fourth squares as neighbors, so it gets the value 5", () => {
    expect(f2(2)).toBe(4);
});

test("Square 5 only has the first and fourth squares as neighbors, so it gets the value 5", () => {
    expect(f2(4)).toBe(5);
});

test("part 2", () => {
    expect(f2(265149)).toBe(266330);
});
