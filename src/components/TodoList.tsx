import React, { useMemo, useState } from "react";
import { v4 as uuid } from "uuid";

enum TodoStatus {
  ALL = "All",
  ACTIVE = "Active",
  COMPLETE = "Complete",
}

interface Todo {
  id: string;
  task: string;
  complete: boolean;
}

const TodoList = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [task, setTask] = useState("");
  const [currentStatus, setCurrentStatus] = useState(TodoStatus.ALL);

  const activeList = todoList.filter((item) => !item.complete);

  const handleAddTask = (task: string) => {
    setTodoList([
      ...todoList,
      {
        id: uuid(),
        task: task,
        complete: false,
      },
    ]);

    setTask("");
  };

  const handleComplete = (todo: Todo) => {
    const nextTodoList = todoList.map((item) => {
      if (item.id === todo.id) {
        return { ...item, complete: true };
      } else {
        return item;
      }
    });

    setTodoList(nextTodoList);
  };

  const handleDelete = (id: string) => {
    setTodoList(todoList.filter((item) => item.id !== id));
  };

  const filterDisplayTodo = (todoList: Todo[], filter: TodoStatus) => {
    switch (filter) {
      case TodoStatus.ALL:
        return todoList;
      case TodoStatus.ACTIVE:
        return activeList;
      case TodoStatus.COMPLETE:
        return todoList.filter((item) => item.complete);
      default:
        return todoList;
    }
  };

  const displayTodoList = useMemo(() => {
    return filterDisplayTodo(todoList, currentStatus);
  }, [currentStatus, todoList]);

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
            if (e.key === "Enter") {
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
              Congratulation ! You have done it!
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
                    onChange={() => handleComplete(item)}
                  />
                  <label
                    className="py-4 cursor-pointer flex items-center grow before:content-[''] before:block before:w-5 before:h-5 before:mr-2 before:rounded-full before:border before:border-gray-200 peer-checked:before:bg-yellow-400 peer-checked:before:border-0 peer-checked:before:bg-[url('./check.svg')] peer-checked:before:bg-[length:12px_auto] peer-checked:before:bg-no-repeat peer-checked:before:bg-center"
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
          <div className="text-slate-400">{activeList.length} items left</div>
          <div className="flex justify-center items-center sm:mt-0 mt-2">
            {Object.values(TodoStatus).map((value) => {
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
