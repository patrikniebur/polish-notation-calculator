import { parse } from "./parse";
import { CalculationASTTrunk } from "./types";

export function calculate(input: string) {
  const ast = parse(input);

  return computeTrunk(ast);
}

export function computeTrunk(
  astOrOperand: CalculationASTTrunk | number
): number {
  if (typeof astOrOperand === "number") {
    return astOrOperand;
  }

  const [rawOperandA, rawOperandB] = astOrOperand.operands;

  const operandA = computeTrunk(rawOperandA);
  const operandB = computeTrunk(rawOperandB);

  switch (astOrOperand.operator) {
    case "add":
      return operandA + operandB;
    case "subtract":
      return operandA - operandB;
    case "divide":
      return operandA / operandB;
    case "multiply":
      return operandA * operandB;
    default:
      const unsupportedOperator: never = astOrOperand.operator;
      throw Error("Calculation does not support this operand");
  }
}
