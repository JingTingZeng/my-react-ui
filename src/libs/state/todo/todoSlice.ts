import { PayloadAction, createAsyncThunk, createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";
import { TodoFilter } from "../../enum/todo.enum";
import { RootState } from "../store";
import { nanoid } from '@reduxjs/toolkit'
import { LoadingState } from "../../interface/loading-state.interface";
import { Status } from "../../enum/status.enum";
import sendApiRequest from "../../api/api";
import { API_URL } from "../../api/api-config";
import { TodoDataInfo } from "../../api/model/todo.model";

export interface TodoState {
  list: TodoDataInfo[],
  filter: TodoFilter,
  queryListState: LoadingState | null
}

const todoAdapter = createEntityAdapter<TodoDataInfo>({
  sortComparer: (a, b) => a.title.localeCompare(b.title)
});

const initialState = todoAdapter.getInitialState({
  filter: TodoFilter.ALL,
  queryListState: {
    state: Status.IDLE,
    error: ''
  }
})

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: {
      reducer: (state, action: PayloadAction<TodoDataInfo>) => {
        state.entities[action.payload.id] = action.payload;
      },
      prepare: (value: string) => ({
        payload: {
          id: nanoid(),
          title: value,
          completed: false,
        }
      })
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      todoAdapter.removeOne(state, action.payload);
    },
    completeTodo: (state, action: PayloadAction<string>) => {
      const task = state.entities[action.payload];
      if (task) task.completed = true;
    },
    updateFilter: (state, action: PayloadAction<TodoFilter>) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodoList.pending, (state, action) => {
        state.queryListState.state = Status.PENDING;
      })
      .addCase(fetchTodoList.fulfilled, (state, action) => {
        state.queryListState.state = Status.SUCCESS;
        todoAdapter.upsertMany(state, action.payload)

      })
      .addCase(fetchTodoList.rejected, (state, action) => {
        state.queryListState = { state: Status.FAILED, error: action.error.message as string };
      })
  }
});

// action
export const { addTodo, deleteTodo, completeTodo, updateFilter } = todoSlice.actions;

// selector
export const {
  selectAll: selectAllTodo,
  selectById: selectTodoById
} = todoAdapter.getSelectors((state: RootState) => state.todo);

export const selectActiveCount = createSelector(
  selectAllTodo,
  (todoList: TodoDataInfo[]) => todoList.filter((todo) => !todo.completed).length
);
export const selectDisplayTodoList = createSelector(
  selectAllTodo,
  (state: RootState) => state.todo.filter,
  (list, filter) => getFilterTodoList(list, filter)
)

//thunk
export const fetchTodoList = createAsyncThunk(
  'todo/fetchTodoList',
  async () => {
    const res = await sendApiRequest<TodoDataInfo[]>(API_URL.GetTodoList);
    return res;
  })

const getFilterTodoList = (todoList: TodoDataInfo[], filter: TodoFilter): TodoDataInfo[] => {
  switch (filter) {
    case TodoFilter.ALL:
      return todoList;
    case TodoFilter.ACTIVE:
      return todoList.filter((item) => !item.completed);
    case TodoFilter.COMPLETE:
      return todoList.filter((item) => item.completed);
  }
};

export default todoSlice.reducer;