import { CalculationASTTrunk, Operator } from "./types";
import {
  IllegalCharacter,
  UnexpectedOrderOfCharacters,
  UnexpectedEndOfExpression,
} from "./errors";

const operandMap: Record<string, Operator> = {
  "+": "add",
  "-": "subtract",
  "/": "divide",
  x: "multiply",
};

export function parse(input: string): CalculationASTTrunk {
  const rootAst = parseToASTTrunk(0, input);

  if (rootAst.end < input.trimEnd().length) {
    throw new UnexpectedEndOfExpression();
  }

  return rootAst;
}

function parseToASTTrunk(
  startingIndex = 0,
  input: string
): CalculationASTTrunk {
  let currentIndex = startingIndex;
  const root: Partial<CalculationASTTrunk> = { start: startingIndex };

  const operator = findOperator(currentIndex, input);
  currentIndex = operator.index;

  const operand1 = findOperand(currentIndex, input);
  currentIndex = operand1.index;

  const operand2 = findOperand(currentIndex, input);
  currentIndex = operand2.index;

  root.operator = operator.result;
  root.operands = [operand1.result, operand2.result];
  root.end = currentIndex;

  return root as CalculationASTTrunk;
}

const numberRegex = /^\d+(?:\.\d+)?/;
function findOperand(startIndex: number, input: string) {
  let currentIndex = startIndex;

  while (currentIndex < input.length) {
    const currentCharacter = input[currentIndex];

    assertLegalCharacter(currentIndex, input);

    if (operandMap[currentCharacter]) {
      const trunk = parseToASTTrunk(currentIndex, input);
      return { result: trunk, index: trunk.end - trunk.start + currentIndex };
    }

    if (numberRegex.test(currentCharacter)) {
      const numberMatch = numberRegex.exec(input.slice(currentIndex))![0];
      currentIndex++;
      return {
        result: parseFloat(numberMatch),
        index: currentIndex + numberMatch.length,
      };
    }

    if (/\s/.test(currentCharacter) === false) {
      throw new UnexpectedOrderOfCharacters(currentIndex, currentCharacter);
    }

    currentIndex++;
  }

  throw new UnexpectedEndOfExpression("operand");
}

function findOperator(startIndex: number, input: string) {
  let currentIndex = startIndex;

  while (currentIndex < input.length) {
    const currentCharacter = input[currentIndex];

    assertLegalCharacter(currentIndex, input);

    if (operandMap[currentCharacter]) {
      return { result: operandMap[currentCharacter], index: currentIndex + 1 };
    }

    if (/\s/.test(currentCharacter) === false) {
      throw new UnexpectedOrderOfCharacters(currentIndex, currentCharacter);
    }

    currentIndex++;
  }

  throw new UnexpectedEndOfExpression("operator");
}

const legalCharactersRegex = /[+-\/x+\s]|\d+/g;
function assertLegalCharacter(currentIndex: number, input: string) {
  legalCharactersRegex.lastIndex = 0;
  if (legalCharactersRegex.test(input[currentIndex]) === false) {
    throw new IllegalCharacter(currentIndex, input[currentIndex]);
  }
}
