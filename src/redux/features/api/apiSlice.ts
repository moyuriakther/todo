/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { addTodo, updateTodo } from "../todo/todoSlice";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
  }),
  tagTypes: ["Tasks"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: (priority) => {
        const params = new URLSearchParams();
        if (priority) {
          params.append("priority", priority);
        }
        return {
          url: `/tasks`,
          method: "GET",
          params,
        };
      },
      async onQueryStarted({ queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(addTodo(result.data));
        } catch (error) {
          console.log(error);
        }
      },
      providesTags: ["Tasks"],
    }),
    getTodo: builder.query({
      query: (id) => ({
        url: `/task/${id}`,
        method: "GET",
      }),
    }),
    addTodo: builder.mutation({
      query: (data) => ({
        url: "/task",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Tasks"],
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/task/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
    }),
    editTask: builder.mutation({
      query: (data) => ({
        url: `/task/${data?._id}`,
        method: "PUT",
        body: data,
      }),
      async onQueryStarted({ queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(updateTodo(result.data));
        } catch (error) {
          console.log(error);
        }
      },
      invalidatesTags: ["Tasks"],
    }),
  }),
});
export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useDeleteTaskMutation,
  useEditTaskMutation,
  useGetTodoQuery,
} = apiSlice;
