export class IllegalCharacter extends Error {
  index: number;
  character: string;
  constructor(index: number, character: string) {
    super(`Invalid character "${character}" at index ${index}`);

    this.name = "IllegalCharacter";
    this.index = index;
    this.character = character;
  }
}

export class UnexpectedOrderOfCharacters extends Error {
  index: number;
  character: string;
  constructor(index: number, character: string) {
    super(`Unexpected character "${character}" at index ${index}`);

    this.name = "UnexpectedOrderOfCharacters";
    this.index = index;
    this.character = character;
  }
}

type CalcParameter = "operator" | "operand";
export class UnexpectedEndOfExpression extends Error {
  parameter?: CalcParameter;
  constructor(parameter?: CalcParameter) {
    let message = "Unexpected end of expression.";
    if (parameter) {
      message += ` Expecting next ${parameter}`;
    }
    super(message);

    this.name = "UnexpectedEndOfExpression";
    this.parameter = parameter;
  }
}
