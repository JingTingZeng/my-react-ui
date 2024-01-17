import React, {
  Ref,
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Button from "./ui/Button";

enum Winner {
  X = "X",
  O = "O",
  XO = "XO",
}

interface winnerResult {
  winner: Winner;
  className: string;
}

const WinnerCombination = [
  //rows
  { combo: [0, 1, 2], className: "top-[40px]" },
  { combo: [3, 4, 5], className: "top-[120px]" },
  { combo: [6, 7, 8], className: "top-[200px]" },

  //columns
  { combo: [0, 3, 6], className: "left-[40px] rotate-90 origin-left" },
  { combo: [1, 4, 7], className: "left-[120px] rotate-90 origin-left" },
  { combo: [2, 5, 8], className: "left-[200px] rotate-90 origin-left" },

  //diagonal
  {
    combo: [0, 4, 8],
    className: "left-[0px] origin-left rotate-45 scale-x-[1.4]",
  },
  {
    combo: [2, 4, 6],
    className: "right-[0px] origin-right -rotate-45 scale-x-[1.4]",
  },
];

const Line = forwardRef(
  (
    {
      className,
      useAnimation = false,
    }: {
      className: string;
      useAnimation?: boolean;
    },
    ref: Ref<HTMLDivElement>
  ) => {
    return (
      <div
        ref={ref}
        className={
          className +
          " absolute rounded-full " +
          (useAnimation
            ? "bg-yellow-400 dark:bg-white"
            : "bg-gray-700 dark:bg-yellow-200")
        }
      ></div>
    );
  }
);

const calculateWinner = (
  squares: string[]
): null | { winner: Winner; className: string } => {
  for (const { combo, className } of WinnerCombination) {
    const [a, b, c] = combo;

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: Winner[squares[a] as Winner],
        className: className,
      };
    }
  }

  if (squares.every((item) => !!item)) {
    return { winner: Winner.XO, className: "" };
  }

  return null;
};

const TicTacToe = () => {
  const [square, setSquare] = useState(Array(9).fill(null));
  const [xIsCurrent, setXIsCurrent] = useState(false);
  const [winnerResult, setWinnerResult] = useState<null | winnerResult>(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const animationLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleAnimation = (event: AnimationEvent) => {
      if (winnerResult && event.animationName === "fadeIn") {
        setShowAnimation(false);
      }
    };
    window.addEventListener("animationend", handleAnimation);
    return () => window.removeEventListener("animationend", handleAnimation);
  }, [winnerResult]);

  const result = useMemo(() => {
    switch (winnerResult?.winner) {
      case Winner.O:
        return "O Win";
      case Winner.X:
        return "X Win";
      case Winner.XO:
        return "OX Even";
      default:
        return "";
    }
  }, [winnerResult]);

  const handlePlay = (current: number): void => {
    if (square[current]) return;

    const nextSquare = [...square];
    nextSquare[current] = xIsCurrent ? "X" : "O";

    setSquare(nextSquare);
    setXIsCurrent(!xIsCurrent);

    const nextWinnerResult = calculateWinner(nextSquare);
    if (nextWinnerResult) {
      setWinnerResult(nextWinnerResult);
      setShowAnimation(!!nextWinnerResult.className);
    }
  };

  const restart = () => {
    setSquare(Array(9).fill(null));
    setXIsCurrent(false);
    setWinnerResult(null);
    setShowAnimation(false);
  };

  if (winnerResult && !showAnimation) {
    return (
      <div className="flex flex-col justify-center items-center">
        <div className="text-5xl font-bold mb-10">{result}</div>
        <Button disabled={false} style="primary" onClick={restart}>
          Play again
        </Button>
      </div>
    );
  }
  return (
    <div className="">
      <div className="text-lg text-gray-500 mb-2 dark:text-white">
        Current player:{" "}
        <span className="font-bold align-middle">{xIsCurrent ? "X" : "O"}</span>
      </div>
      <div className="bg-gray-300 p-5 rounded-lg dark:bg-slate-600">
        <div className="relative grid grid-cols-3 gap">
          {square.map((item, index) => {
            return (
              <button
                className="w-20 h-20 text-4xl font-bold"
                onClick={() => handlePlay(index)}
                key={index}
              >
                {item}
              </button>
            );
          })}
          <Line className="top-20 -translate-y-2/4 w-full h-2" />
          <Line className="bottom-20 translate-y-2/4 w-full h-2" />
          <Line className="left-20 -translate-x-2/4 w-2 h-full" />
          <Line className="right-20 translate-x-2/4 w-2 h-full" />
          {showAnimation && (
            <Line
              ref={animationLineRef}
              useAnimation={true}
              className={
                winnerResult?.className +
                " -translate-y-2/4 h-2 animate-[fadeIn_1s_ease-in-out_forwards]"
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;
