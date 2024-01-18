import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { TodoData, TodoFilter } from "../../interface/todo.interface";
import { v4 as uuid } from "uuid";
import { RootState } from "../store";

export interface TodoState {
  list: TodoData[]
}

const initialState: TodoState = {
  list: []
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.list.push({
        id: uuid(),
        task: action.payload,
        complete: false,
      })
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter(item => item.id !== action.payload)
    },
    completeTodo: (state, action: PayloadAction<string>) => {
      const task = state.list.find(item => item.id === action.payload);
      if (task) task.complete = true;
    }
  }
});

// action
export const { addTodo, deleteTodo, completeTodo } = todoSlice.actions;

// selector
export const selectActiveCount = createSelector(
  (state: RootState) => state.todo.list,
  (todoList: TodoData[]) => {
    // console.log("todoList createSelector running");
    return todoList.filter((todo) => !todo.complete).length
  }
);
export const selectDisplayTodo = createSelector(
  (state: RootState) => state.todo.list,
  (_, filter: TodoFilter) => filter,
  (todoList: TodoData[], filter: TodoFilter) => {
    // console.log("selectDisplayTodo createSelector running");
    return getFilterTodoList(todoList, filter)
  }
)

const getFilterTodoList = (todoList: TodoData[], filter: TodoFilter) => {
  switch (filter) {
    case TodoFilter.ALL:
      return todoList;
    case TodoFilter.ACTIVE:
      return todoList.filter((item) => !item.complete);
    case TodoFilter.COMPLETE:
      return todoList.filter((item) => item.complete);
  }
};

export default todoSlice.reducer;