import { calculate } from "../index";
import { IllegalCharacter } from "../errors";

describe("Calculate with Polish notation", () => {
  it("Handles simple addition", () => {
    expect(calculate("+ 2 5")).toBe(7);
  });

  it("Handles more operators", () => {
    expect(calculate("x + 4 5 6")).toBe(54);
    expect(calculate("/ 20 - 10 5")).toBe(4);
  });

  it("Handles float numbers", () => {
    expect(calculate("x 4 2.5")).toBe(10);
    expect(calculate("x / 10 4 7")).toBe(17.5);
  });

  it("Throws an error", () => {
    try {
      calculate("+ 25 a 5");
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect(e).toBeInstanceOf(IllegalCharacter);
      expect(e).toHaveProperty("index", 5);
      expect(e).toHaveProperty("character", "a");
    }
  });
});
