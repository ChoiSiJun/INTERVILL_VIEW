import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const api_url = import.meta.env.VITE_HOME_API;


export const QuestionApi = createApi({
    reducerPath: 'qstnApi',
    baseQuery: fetchBaseQuery({ baseUrl: api_url }),
    tagTypes: ['Qstn'],
    endpoints: (builder) => ({
        getQuestion: builder.query({
            query: (reqBody) => ({
                url: '/question/v1/inqQuestion',
                method: 'POST',
                body: reqBody
            }),
            //transformResponse: res => res.sort((a, b) => b.id - a.id),
            providesTags: ['Qstn']
        }),
        addQuestion: builder.mutation({
            query: (reqBody) => ({
                url: '/question/v1/addQuestion',
                method: 'POST',
                body: reqBody
            }),
            invalidatesTags: ['Qstn']
        }),
        updQuestion: builder.mutation({
            query: (reqBody) => ({
                url: `/question/v1/updQuestion`,
                method: 'POST',
                body: reqBody
            }),
            invalidatesTags: ['Qstn']
        }),
        delQuestion: builder.mutation({
            query: (reqBody) => ({
                url: `/question/v1/delQuestion`,
                method: 'POST',
                body: reqBody
            }),
            invalidatesTags: ['Qstn']
        }),
    })
})

export default QuestionApi;
// export const {
//     useGetQuestionQuery,
//     useAddQuestionMutation,
//     useUpdQuestionMutation,
//     useDelQuestionMutation
// } = QuestionApi;