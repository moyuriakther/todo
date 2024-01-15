// import { useAppSelector } from "@/redux/hook";
import { TTodo } from "@/redux/features/todo/todoSlice";
import AddTodoModal from "./AddTodoModal";
import TodoCard from "./TodoCard";
import TodoFilter from "./TodoFilter";
import { useGetTodosQuery } from "@/redux/features/api/apiSlice";
import { useState } from "react";
import { sortByIsCompleted } from "@/redux/utils/utils";
// import { useEffect } from "react";

export default function TodoContainer() {
  const [priority, setPriority] = useState<string>("");
  const { data: todos, isLoading, isError } = useGetTodosQuery(priority);
  const sortedTodos = Array.isArray(todos?.data)
    ? [...todos.data].sort(sortByIsCompleted)
    : [];

  if (isLoading) {
    <p className="bg-slate-200 text-slate-200 text-[9px] w-60">Loading...</p>;
  }
  if (isError) {
    <div className="w-full flex items-center justify-center h-10 max-w-7xl mx-auto p-2 text-red-700 bg-red-100 col-span-12">
      Something is wrong
    </div>;
  }
  return (
    <div>
      <div className="flex justify-between mb-5">
        <AddTodoModal />
        <TodoFilter priority={priority} setPriority={setPriority} />
      </div>
      <div className="bg-primary-gradient w-full h-full rounded-xl p-[5px]">
        <div className="bg-white p-5 w-full h-full rounded-lg space-y-3">
          {sortedTodos?.length ? (
            sortedTodos?.map((todo: TTodo) => (
              <TodoCard
                priority={todo?.priority}
                title={todo?.title}
                description={todo?.description}
                _id={todo._id}
                isCompleted={todo.isCompleted}
                key={todo._id}
              />
            ))
          ) : (
            <div className="flex justify-center bg-white p-5 rounded-md text-2xl font-bold">
              <p>There is no task pending</p>
            </div>
          )}
          {}
        </div>
        {/* */}
      </div>
    </div>
  );
}
