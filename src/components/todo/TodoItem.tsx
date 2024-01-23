import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../libs/state/store";
import {
  completeTodo,
  deleteTodo,
  selectTodoById,
} from "../../libs/state/todo/todoSlice";

const TodoItem = ({ id }: { id: string }) => {
  const dispatch = useDispatch();
  const todo = useSelector((state: RootState) => selectTodoById(state, id));
  const handleComplete = () => {
    if (id) dispatch(completeTodo(id));
  };

  const handleDelete = () => {
    if (id) dispatch(deleteTodo(id));
  };

  return todo ? (
    <li className="flex items-center text-lg px-4 border-b border-solid border-gray-100 hover:bg-gray-50">
      <input
        id={"check" + todo.id}
        className="w-0 h-0 invisible peer block"
        type="checkbox"
        checked={todo.completed}
        onChange={handleComplete}
      />
      <label
        className="py-4 cursor-pointer flex items-center grow before:content-[''] before:block before:w-5 before:h-5 before:mr-2 before:rounded-full before:border before:border-gray-200 peer-checked:before:bg-yellow-400 peer-checked:before:border-0 peer-checked:before:bg-[url('./assets/check.svg')] peer-checked:before:bg-[length:12px_auto] peer-checked:before:bg-no-repeat peer-checked:before:bg-center"
        htmlFor={"check" + todo.id}
      >
        {todo.title}
      </label>
      <button
        onClick={handleDelete}
        className="shrink text-slate-400 hover:text-red-500 transition-colors duration-300 ease-in-out"
      >
        Delete
      </button>
    </li>
  ) : null;
};

export default React.memo(TodoItem);
