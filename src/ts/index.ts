import { fromEvent } from "rxjs";
import { map, tap } from "rxjs/operators";

import { calculate } from "./library";

const calculatorInput: HTMLInputElement = document.querySelector("#notation")!;
const resultInput: HTMLInputElement = document.querySelector(".result")!;

const errorElement = document.createElement("em");
errorElement.classList.add("error-message");

function resetError() {
  calculatorInput.classList.remove("error");
  if (errorElement.parentElement) {
    document.body.removeChild(errorElement);
  }
}

function setError(message: string) {
  calculatorInput.classList.add("error");
  errorElement.innerText = message;
  document.body.appendChild(errorElement);
}

function setResult(result: number) {
  resultInput.setAttribute("value", result.toString());
}

fromEvent(calculatorInput, "keyup")
  .pipe(
    map(() => calculatorInput.value),
    map((notation) => {
      resetError();
      try {
        return calculate(notation);
      } catch (error) {
        return { error };
      }
    })
  )
  .subscribe((val) => {
    if (typeof val === "number") {
      setResult(val);
    } else {
      setError(val.error.message);
    }
  });
