import { TTodo } from "../features/todo/todoSlice";

export const sortByIsCompleted = (a: TTodo, b: TTodo) => {
  if (a.isCompleted && !b.isCompleted) {
    return 1;
  } else if (!a.isCompleted && b.isCompleted) {
    return -1;
  } else {
    return 0;
  }
};
