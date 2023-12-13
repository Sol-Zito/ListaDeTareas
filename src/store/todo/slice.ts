import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type Todo = {
  title: string;
  isCompleted: boolean;
  id: number;
};

export type TodoState = {
  todos: Todo[];
  isLoading: boolean;
  isError: boolean;
};

const initialState: TodoState = {
  todos: [],
  isLoading: true,
  isError: false,
};

export const GET_TODOS = createAsyncThunk(
  "todo/GET_TODOS",
  async (): Promise<Todo[]> => {
    const resp = await fetch("https://rickandmortyapi.com/api/character");
    const data = await resp.json();
    //throw new Error("Error");
    return data;
  }
);

export const TodoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    ADD_TODO: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    COMPLETE_TODO: (state, action: PayloadAction<number>) => {
      const findTodo = state.todos.find((todo) => todo.id === action.payload);
      if (findTodo) {
        findTodo.isCompleted = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      GET_TODOS.fulfilled,
      (state, action: PayloadAction<Todo[]>) => {
        state.todos = action.payload;
        state.isLoading = false;
      }
    ),
      builder.addCase(GET_TODOS.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      }),
      builder.addCase(GET_TODOS.pending, (state) => {
        state.isLoading = true;
      });
  },
});

// fulfilled --> promesa ya resuelta

const todoReducer = TodoSlice.reducer;
export const { ADD_TODO, COMPLETE_TODO } = TodoSlice.actions;
export default todoReducer;
