import React, { useState } from "react";
import { TodoFilter } from "../libs/interface/todo.interface";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../libs/state/store";
import {
  addTodo,
  completeTodo,
  deleteTodo,
  selectActiveCount,
  selectDisplayTodo,
} from "../libs/state/todo/todoSlice";

const TodoList = () => {
  const dispatch = useDispatch();
  const [task, setTask] = useState("");
  const [currentStatus, setCurrentStatus] = useState(TodoFilter.ALL);

  const displayTodoList = useSelector((state: RootState) =>
    selectDisplayTodo(state, currentStatus)
  );
  const activeTodoCount = useSelector(selectActiveCount);

  const handleAddTask = (task: string) => {
    dispatch(addTodo(task));
    setTask("");
  };

  const handleComplete = (id: string) => {
    dispatch(completeTodo(id));
  };

  const handleDelete = (id: string) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className="bg-white max-w-lg w-full rounded-lg mx-auto dark:text-gray-700">
      <div className="flex p-4 border-b border-solid border-gray-100">
        <input
          className="grow h-10 p-2 text-lg bg-slate-100 focus-visible:outline-0"
          type="text"
          value={task}
          placeholder="add todo task..."
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              task !== "" &&
              !e.nativeEvent.isComposing
            ) {
              handleAddTask(task);
            }
          }}
        />
        <button
          className="shrink w-16 flex justify-center items-center bg-yellow-400 text-white font-bold"
          onClick={() => handleAddTask(task)}
        >
          Add
        </button>
      </div>
      <div>
        <ul>
          {displayTodoList.length === 0 ? (
            <div className="text-gray-500 text-center p-4">
              {currentStatus === TodoFilter.COMPLETE && activeTodoCount > 0
                ? `You still have ${activeTodoCount} todo left!`
                : "Congratulation ! You have done it!"}
            </div>
          ) : (
            displayTodoList.map((item) => {
              return (
                <li
                  className="flex items-center text-lg px-4 border-b border-solid border-gray-100 hover:bg-gray-50"
                  key={item.id}
                >
                  <input
                    id={"check" + item.id}
                    className="w-0 h-0 invisible peer block"
                    type="checkbox"
                    checked={item.complete}
                    onChange={() => handleComplete(item.id)}
                  />
                  <label
                    className="py-4 cursor-pointer flex items-center grow before:content-[''] before:block before:w-5 before:h-5 before:mr-2 before:rounded-full before:border before:border-gray-200 peer-checked:before:bg-yellow-400 peer-checked:before:border-0 peer-checked:before:bg-[url('./assets/check.svg')] peer-checked:before:bg-[length:12px_auto] peer-checked:before:bg-no-repeat peer-checked:before:bg-center"
                    htmlFor={"check" + item.id}
                  >
                    {item.task}
                  </label>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="shrink text-slate-400 hover:text-red-500 transition-colors duration-300 ease-in-out"
                  >
                    Delete
                  </button>
                </li>
              );
            })
          )}
        </ul>
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
                  onClick={() => setCurrentStatus(value)}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
