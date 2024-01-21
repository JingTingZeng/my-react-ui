import React from "react";
import { TodoFilter } from "../../libs/enum/todo.enum";
import { useDispatch, useSelector } from "react-redux";
import {
  selectActiveCount,
  updateFilter,
} from "../../libs/state/todo/todoSlice";
import { RootState } from "../../libs/state/store";

const TodoFooter = () => {
  const dispatch = useDispatch();
  const activeTodoCount = useSelector(selectActiveCount);
  const currentStatus = useSelector((state: RootState) => state.todo.filter);

  return (
    <div className="sm:flex px-4 py-3 justify-between items-center">
      <div className="text-slate-400">{activeTodoCount} items left</div>
      <div className="flex justify-center items-center sm:mt-0 mt-2">
        {Object.values(TodoFilter).map((value) => {
          return (
            <button
              className={
                currentStatus === value
                  ? "p-2 text-yellow-400"
                  : "p-2 text-slate-400"
              }
              key={value}
              onClick={() => dispatch(updateFilter(value))}
            >
              {value}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TodoFooter;
