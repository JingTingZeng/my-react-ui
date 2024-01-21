import { TodoFilter } from "../../libs/enum/todo.enum";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ApiDispatch, RootState } from "../../libs/state/store";
import {
  fetchTodoList,
  selectActiveCount,
  selectDisplayTodoList,
} from "../../libs/state/todo/todoSlice";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import TodoFooter from "./TodoFooter";
import { useEffect } from "react";
import { Status } from "../../libs/enum/status.enum";

const TodoList = () => {
  const dispatch = useDispatch<ApiDispatch>();
  const activeTodoCount = useSelector(selectActiveCount);
  const currentStatus = useSelector((state: RootState) => state.todo.filter);
  const todoIdList = useSelector(
    (state: RootState) => selectDisplayTodoList(state).map((item) => item.id),
    shallowEqual
  );
  const queryTodoListState = useSelector(
    (state: RootState) => state.todo.queryListState?.state
  );

  useEffect(() => {
    if (queryTodoListState === Status.IDLE) {
      dispatch(fetchTodoList());
    }
  }, [queryTodoListState]);

  return (
    <div className="bg-white max-w-lg w-full rounded-lg mx-auto dark:text-gray-700">
      <div className="p-4 border-b border-solid border-gray-100">
        <TodoForm></TodoForm>
      </div>
      <div>
        {todoIdList?.length === 0 ? (
          <div className="text-gray-500 text-center p-4">
            {currentStatus === TodoFilter.COMPLETE && activeTodoCount > 0
              ? `You still have ${activeTodoCount} todo left!`
              : "Congratulation ! You have done it!"}
          </div>
        ) : (
          <ul>
            {todoIdList.map((id) => {
              return <TodoItem id={id} key={id}></TodoItem>;
            })}
          </ul>
        )}
      </div>
      <TodoFooter></TodoFooter>
    </div>
  );
};

export default TodoList;
