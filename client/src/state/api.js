import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  reducerPath: 'main',
  tagTypes: [],
  endpoints: (build) => ({
    postAiChat: build.mutation({
      query: (payload) => ({
        url: 'openai/chat',
        method: 'POST',
        body: payload,
      }),
    }),
    postAiGrammarChecker: build.mutation({
      query: (payload) => ({
        url: 'openai/grammar-checker',
        method: 'POST',
        body: payload,
      }),
    }),
    postLogin: build.mutation({
      query: (payload) => ({
        url: 'auth/login',
        method: 'POST',
        body: payload,
      }),
    }),
    postSignUp: build.mutation({
      query: (payload) => ({
        url: 'auth/signup',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
})

export const {
  usePostAiChatMutation,
  usePostAiGrammarCheckerMutation,
  usePostLoginMutation,
  usePostSignUpMutation,
} = api
