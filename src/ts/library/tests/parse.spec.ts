import { parse } from "../parse";
import {
  UnexpectedOrderOfCharacters,
  IllegalCharacter,
  UnexpectedEndOfExpression,
} from "../errors";

describe("Creating AST", () => {
  describe("Parsing valid inputs", () => {
    it("Can create AST with single operator and two operands", () => {
      const testString = "- 4 5";
      const astResult = parse(testString);

      expect(astResult).toStrictEqual(
        contains({
          operator: "subtract",
          operands: [4, 5],
        })
      );
    });

    it("Can create AST with multiple operators and operands", () => {
      const testString = "x + 4 5 6";
      const astResult = parse(testString);

      const firstOperand = contains({
        operator: "add",
        operands: [4, 5],
      });
      expect(astResult).toStrictEqual(
        contains({
          operator: "multiply",
          operands: [firstOperand, 6],
        })
      );
    });

    it("Can create AST with correct floating point numbers", () => {
      const testString = "x + 4.2 5.0001 6.9000008";
      const astResult = parse(testString);

      const firstOperand = contains({
        operator: "add",
        operands: [4.2, 5.0001],
      });
      expect(astResult).toStrictEqual(
        contains({
          operator: "multiply",
          operands: [firstOperand, 6.9000008],
        })
      );
    });

    it("Can create AST with multiple nested operands", () => {
      const testString = "/ 20 - 10 + 5 6";
      const astResult = parse(testString);

      const nestedOperand = contains({
        operator: "add",
        operands: [5, 6],
      });

      const secondOperand = contains({
        operator: "subtract",
        operands: [10, nestedOperand],
      });

      expect(astResult).toStrictEqual(
        contains({
          operator: "divide",
          operands: [20, secondOperand],
        })
      );
    });
  });

  describe("Parsing invalid notations", () => {
    it("Incomplete expression throws UnexpectedEndOfExpression", () => {
      expect(() => parse("+ 2 5 +")).toThrow(UnexpectedEndOfExpression);
    });

    it("Illegal character throws IllegalCharacter error", () => {
      expect(() => parse("* 25 3")).toThrow(IllegalCharacter);
    });

    it("Unexpected character throws", () => {
      expect(() => parse("25 + 3")).toThrow(UnexpectedOrderOfCharacters);
    });
  });
});

function contains(obj: Parameters<typeof expect.objectContaining>[0]) {
  return expect.objectContaining(obj);
}
