export type Operand = CalculationASTTrunk | number;

export type Operator = "add" | "subtract" | "divide" | "multiply";
export type CalculationASTTrunk = {
  operator: Operator;
  operands: [Operand, Operand];
  start: number;
  end: number;
};
