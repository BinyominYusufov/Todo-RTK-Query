import { configureStore } from '@reduxjs/toolkit'
import { categoryApi } from '../api/category/category'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
    reducer: {
        [categoryApi.reducerPath]: categoryApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(categoryApi.middleware),
})

setupListeners(store.dispatch)
