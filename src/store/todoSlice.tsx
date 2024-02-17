import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ITodo } from "../group/todoList/types";
import API from "../utils/API";
import { getUserSq } from "../utils/utils";

const userSq = getUserSq();

export const fetchTodos = createAsyncThunk("todos/fetch", async () => {
  const response = await API.get(`/todos/${userSq}`);
  return response;
});

export const addTodos = createAsyncThunk<
  any,
  { text: string },
  { state: { todos: IinitialState } }
>("todos/add", async ({ text }, thunkAPI) => {
  const { todos } = thunkAPI.getState();
  const currentSq = todos.currentSq + 1;
  const newParam = {
    currentSq,
    todoList: [
      ...todos.todoList,
      { text, id: currentSq, isChecked: false, getReward: false },
    ],
  };
  const response = await API.patch(`/todos/${userSq}`, newParam);
  if (response.status === 400) {
    return thunkAPI.rejectWithValue(response.statusText);
  }
  return response;
});

export const updateTodos = createAsyncThunk<
  any,
  Partial<ITodo>,
  { state: { todos: IinitialState } }
>("/todos/update", async (params: any, thunkAPI) => {
  const { id, getReward, isChecked } = params;

  const { todoList } = thunkAPI.getState().todos;
  const newTodo = todoList.map((todo) => {
    if (todo.id === id) {
      return (todo = {
        ...todo,
        isChecked: isChecked !== undefined ? isChecked : todo.isChecked,
        getReward: getReward !== undefined ? getReward : todo.getReward,
      });
    } else {
      return todo;
    }
  });

  const response = await API.patch(`/todos/${userSq}`, {
    todoList: [...newTodo],
  });

  if (response.status === 400) {
    return thunkAPI.rejectWithValue(response.statusText);
  }
  return response;
});

export const deleteTodos = createAsyncThunk<
  any,
  number,
  { state: { todos: IinitialState } }
>("/todos/delete", async (id, thunkAPI) => {
  const { todoList } = thunkAPI.getState().todos;
  const newTodo = todoList.filter((todo) => todo.id !== id);

  const newParam = {
    id,
    todoList: [...newTodo],
  };

  const response = await API.patch(`/todos/${userSq}`, newParam);

  if (response.status === 400) {
    return thunkAPI.rejectWithValue(response.statusText);
  }
  return response;
});

interface IinitialState {
  currentSq: number;
  todoList: Array<ITodo>;
}

const initialState: IinitialState = {
  currentSq: 0,
  todoList: [],
};

const TodoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(fetchTodos.fulfilled, (state: any, { payload }: any) => {
      state.currentSq = payload.data.currentSq;
      state.todoList = [...payload.data.todoList];
    });
    builder.addCase(addTodos.fulfilled, (state: any, { payload }: any) => {
      state.currentSq = payload.data.currentSq;
      state.todoList = [...payload.data.todoList];
    });
    builder.addCase(updateTodos.fulfilled, (state: any, { payload }: any) => {
      state.todoList = [...payload.data.todoList];
    });
    builder.addCase(deleteTodos.fulfilled, (state: any, { payload }: any) => {
      state.todoList = [...payload.data.todoList];
    });
  },
});
export default TodoSlice;
