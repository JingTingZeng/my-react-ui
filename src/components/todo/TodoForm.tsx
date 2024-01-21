import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { addTodo } from "../../libs/state/todo/todoSlice";
import { useDispatch } from "react-redux";

const TodoForm = () => {
  const dispatch = useDispatch();
  const [task, setTask] = useState("");

  const handleAddTask = (task: string) => {
    dispatch(addTodo(task));
    setTask("");
  };

  const handleKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && task !== "" && !e.nativeEvent.isComposing) {
      handleAddTask(task);
    }
  };

  return (
    <div className="flex">
      <input
        className="grow h-10 p-2 text-lg bg-slate-100 focus-visible:outline-0"
        type="text"
        value={task}
        placeholder="add todo task..."
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={handleKeydown}
      />
      <button
        className="shrink w-16 flex justify-center items-center bg-yellow-400 text-white font-bold"
        onClick={() => handleAddTask(task)}
      >
        Add
      </button>
    </div>
  );
};

export default TodoForm;
