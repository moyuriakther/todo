import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type TTodo = {
  title?: string;
  description?: string;
  isCompleted?: boolean;
  _id?: string;
  priority: string;
};

type TInitialState = {
  todos: TTodo[];
  filterByPriority: string;
};

const initialState: TInitialState = {
  todos: [],
  filterByPriority: "",
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<TTodo>) => {
      state.todos.push({ ...action.payload });
    },
    updateTodo: (state, action: PayloadAction<TTodo>) => {
      state.todos = state.todos.map((todo) =>
        todo._id === action.payload._id ? action.payload : todo
      );
      // state.todos.sort(sortByIsCompleted);
    },

    removeTodo: (state, action: PayloadAction<string | undefined>) => {
      state.todos = state.todos.filter((todo) => todo._id !== action.payload);
    },
  },
});

export const { addTodo, removeTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
