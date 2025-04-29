import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
    reducerPath: "categoryApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://to-dos-api.softclub.tj/api/categories",
    }),
    tagTypes: ["Category"],

    endpoints: (builder) => ({
        getCategory: builder.query({
            query: () => "",
            providesTags: ["Category"],
        }),

        delCategory: builder.mutation({
            query: (id) => ({
                url: `?id=${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Category"],
        }),

        addCategory: builder.mutation({
            query: (newCategory) => ({
                url: "",
                method: "POST",
                body: newCategory,
            }),
            invalidatesTags: ["Category"],
        }),

        editCategory: builder.mutation({
            query: ({ updatedData }) => ({
                url: "",
                method: "PUT",
                body: updatedData,
            }),
            invalidatesTags: ["Category"],
        }),
    }),
});

export const {
    useGetCategoryQuery,
    useDelCategoryMutation,
    useAddCategoryMutation,
    useEditCategoryMutation,
} = categoryApi;
