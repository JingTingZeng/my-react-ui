import { PayloadAction, createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { TodoData } from "../../interface/todo.interface";
import { TodoFilter } from "../../enum/todo.enum";
import { RootState } from "../store";
import { nanoid } from '@reduxjs/toolkit'
import { LoadingState } from "../../interface/loading-state.interface";
import { Status } from "../../enum/status.enum";
import sendApiRequest from "../../api/api";
import { API_URL } from "../../api/api-config";
import { TodoDataInfo } from "../../api/model/todo.model";

export interface TodoState {
  list: TodoData[],
  filter: TodoFilter,
  queryListState: LoadingState | null
}

const initialState: TodoState = {
  list: [],
  filter: TodoFilter.ALL,
  queryListState: {
    state: Status.IDLE,
    error: undefined
  }
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: {
      reducer: (state, action: PayloadAction<TodoData>) => {
        state.list.push(action.payload)
      },
      prepare: (value: string) => ({
        payload: {
          id: nanoid(),
          task: value,
          complete: false,
        }
      })
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter(item => item.id !== action.payload)
    },
    completeTodo: (state, action: PayloadAction<string>) => {
      const task = state.list.find(item => item.id === action.payload);
      if (task) task.complete = true;
    },
    updateFilter: (state, action: PayloadAction<TodoFilter>) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodoList.pending, (state, action) => {
        state.queryListState = { state: Status.PENDING, error: undefined };
      })
      .addCase(fetchTodoList.fulfilled, (state, action) => {
        state.queryListState = { state: Status.SUCCESS, error: undefined };
        state.list = action.payload
      })
      .addCase(fetchTodoList.rejected, (state, action) => {
        state.queryListState = { state: Status.FAILED, error: action.error.message };
      })
  }
});

// action
export const { addTodo, deleteTodo, completeTodo, updateFilter } = todoSlice.actions;

// selector
export const selectActiveCount = createSelector(
  (state: RootState) => state.todo.list,
  (todoList: TodoData[]) => todoList.filter((todo) => !todo.complete).length
);
export const selectDisplayTodoList = createSelector(
  (state: RootState) => state.todo,
  ({ list, filter }) => getFilterTodoList(list, filter)
)

//thunk
export const fetchTodoList = createAsyncThunk(
  'todo/fetchTodoList',
  async () => {
    const res = await sendApiRequest<TodoDataInfo[]>(API_URL.GetTodoList);
    return convertToViewModel(res);
  })

const getFilterTodoList = (todoList: TodoData[], filter: TodoFilter): TodoData[] => {
  switch (filter) {
    case TodoFilter.ALL:
      return todoList;
    case TodoFilter.ACTIVE:
      return todoList.filter((item) => !item.complete);
    case TodoFilter.COMPLETE:
      return todoList.filter((item) => item.complete);
  }
};

const convertToViewModel = (dataList: TodoDataInfo[]) => {
  return dataList.map((item) => ({
    id: item.id,
    task: item.title,
    complete: item.completed
  }))
}

export default todoSlice.reducer;