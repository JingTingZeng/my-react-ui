import React, { useState } from "react";
import Format from "../libs/utils/format.utils";

const Calculator = () => {
  const [prevNumber, setPrevNumber] = useState<string>("");
  const [currentNumber, setCurrentNumber] = useState<string>("");
  const [operator, setOperator] = useState<string>("");

  const displayPrevNumber = Format.moneyThousands(prevNumber);
  const displayCurrentNumber = Format.moneyThousands(currentNumber);
  const handleClear = () => {
    setPrevNumber("");
    setCurrentNumber("");
    setOperator("");
  };

  const handleDelete = () => {
    const nextCurrentNumber = currentNumber.toString().slice(0, -1);
    setCurrentNumber(nextCurrentNumber);
  };

  const handleAppendNumber = (value: string) => {
    if (value === "." && currentNumber.includes(".")) return;

    let nextCurrentNumber = currentNumber + value;
    if (nextCurrentNumber === "0" || nextCurrentNumber === "00") {
      nextCurrentNumber = "0";
    } else if (nextCurrentNumber.charAt(0) === "0") {
      nextCurrentNumber = nextCurrentNumber.substring(1);
    }

    setCurrentNumber(nextCurrentNumber);
  };

  const chooseOperator = (value: string) => {
    setPrevNumber(currentNumber);
    setOperator(value);
    setCurrentNumber("");
  };

  const compute = () => {
    let result;
    const prev = parseFloat(prevNumber);
    const next = parseFloat(currentNumber);
    if (isNaN(prev) || isNaN(next)) return;

    result = eval(prev + operator + next);
    setPrevNumber("");
    setCurrentNumber(result);
    setOperator("");
  };

  return (
    <form className="max-w-60 w-full rounded-2xl bg-slate-500 p-4 text-white">
      <div className="text-right mb-2">
        <div className="min-h-6">
          <span className="inline-block mr-1">{displayPrevNumber}</span>
          <span>{operator}</span>
        </div>
        <div className="min-h-8 text-2xl font-bold">{displayCurrentNumber}</div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <input
          className="btn-cal btn-cal-operator"
          type="button"
          value="AC"
          onClick={() => handleClear()}
        />
        <input
          className="btn-cal btn-cal-operator"
          type="button"
          value="DE"
          onClick={() => handleDelete()}
        />
        <input
          className="btn-cal btn-cal-operator"
          type="button"
          value="."
          onClick={() => handleAppendNumber(".")}
        />
        <input
          className="btn-cal btn-cal-operator"
          type="button"
          value="/"
          onClick={() => chooseOperator("/")}
        />
        <input
          className="btn-cal"
          type="button"
          value="7"
          onClick={() => handleAppendNumber("7")}
        />
        <input
          className="btn-cal"
          type="button"
          value="8"
          onClick={() => handleAppendNumber("8")}
        />
        <input
          className="btn-cal"
          type="button"
          value="9"
          onClick={() => handleAppendNumber("9")}
        />
        <input
          className="btn-cal btn-cal-operator"
          type="button"
          value="*"
          onClick={() => chooseOperator("*")}
        />
        <input
          className="btn-cal"
          type="button"
          value="4"
          onClick={() => handleAppendNumber("4")}
        />
        <input
          className="btn-cal"
          type="button"
          value="5"
          onClick={() => handleAppendNumber("5")}
        />
        <input
          className="btn-cal"
          type="button"
          value="6"
          onClick={() => handleAppendNumber("6")}
        />
        <input
          className="btn-cal btn-cal-operator"
          type="button"
          value="-"
          onClick={() => chooseOperator("-")}
        />
        <input
          className="btn-cal"
          type="button"
          value="1"
          onClick={() => handleAppendNumber("1")}
        />
        <input
          className="btn-cal"
          type="button"
          value="2"
          onClick={() => handleAppendNumber("2")}
        />
        <input
          className="btn-cal"
          type="button"
          value="3"
          onClick={() => handleAppendNumber("3")}
        />
        <input
          className="btn-cal btn-cal-operator"
          type="button"
          value="+"
          onClick={() => chooseOperator("+")}
        />
        <input
          className="btn-cal"
          type="button"
          value="00"
          onClick={() => handleAppendNumber("00")}
        />
        <input
          className="btn-cal"
          type="button"
          value="0"
          onClick={() => handleAppendNumber("0")}
        />
        <div className="col-span-2 text-center">
          <input
            className="w-full btn-cal btn-cal-operator"
            type="button"
            value="="
            onClick={() => compute()}
          />
        </div>
      </div>
    </form>
  );
};

export default Calculator;
