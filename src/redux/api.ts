import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type wholeSaleOrders = {
    id: number;
    medicineId: number;
    quantity: number;
    status: string;
    createdAt: string;
    updatedAt: string;
}
type wholeSaleOrdersP = {
    medicineId: number;
    quantity: number;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export type user = {
    id: number;
    firstName: string;
    secondName: string;
    address: string;
    phoneNumber: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}
export type medicines = {
    id: number;
    name: string;
    type: string;
    recipeId: number;
    criticalNorm: number;
    quantity: number;
    price: number;
    createdAt: string;
    updatedAt: string;
}
export type order = {
    customerId: number;
    medicineId: number;
}
export type getOrder = {
    id: number;
    customerId: number;
    medicineId: number;
    type: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}
export type recipe = {
    id: number;
    technology: string;
    preparationTime: string;
    createdAt: string;
    updatedAt: string;
}

export type recipeComponent = {
    id: number;
    componentId: number;
    recipeId: number;
    quantityNeeded: number;
    createdAt: string;
    updatedAt: string;
}
export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080',
    }),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        getWholeSaleOrders: builder.query<wholeSaleOrders[], void>({
            query: () => ({
                url: '/wholesale-orders',
                method: 'GET',
            }),
            providesTags: ['Product']
        }),
        getMedic: builder.query<wholeSaleOrders[], void>({
            query: () => ({
                url: '/medicines',
                method: 'GET',
            }),
            providesTags: ['Product']
        }),
        addWholeSaleOrder: builder.mutation<wholeSaleOrders, wholeSaleOrdersP>({
            query: (body) => ({
                url: '/wholesale-orders',
                method: 'POST',
                body,
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ['Product']
        }),
        getUser: builder.query<user[], void>({
            query: () => ({
                url: '/users',
                method: 'GET',
            }),
            providesTags: ['Product']
        }),
        getMedicines: builder.query<medicines[], void>({
            query: () => ({
                url: '/medicines',
                method: 'GET',
            }),
            providesTags: ['Product']
        }),
        addOrder: builder.mutation<void, order>({
            query: ({ customerId, medicineId }) => ({
                url: '/orders',
                method: 'POST',
                body: { customerId, medicineId },
            }),
            invalidatesTags: ['Product']
        }),
        getOrder: builder.query<getOrder[], void>({
            query: () => ({
                url: '/orders',
                method: 'GET'
            }),
            providesTags: ['Product']
        }),
        editOrderStatus: builder.mutation<void, { id: number, status: string, type: string }>({
            query: ({ id, status, type }) => ({
                url: `/orders/${id}`,
                method: 'PATCH',
                body: { status, type }
            }),
            invalidatesTags: ['Product']
        }),
        deleteOrder: builder.mutation<void, { id: number }>({
            query: (id) => ({
                url: `/orders/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Product']
        }),
        getRecipe: builder.query<recipe[], void>({
            query: () => ({
                url: '/recipes',
                method: 'GET'
            }),
            providesTags: ['Product']
        }),
        getRecipeComponents: builder.query<recipeComponent[], void>({
            query: () => ({
                url: '/recipe-components',
                method: 'GET'
            }),
            providesTags: ['Product']
        })
    })
})
export const {
    useGetWholeSaleOrdersQuery,
    useAddWholeSaleOrderMutation,
    useGetMedicQuery,
    useGetUserQuery,
    useGetMedicinesQuery,
    useAddOrderMutation,
    useGetOrderQuery,
    useEditOrderStatusMutation,
    useDeleteOrderMutation,
    useGetRecipeQuery,
    useGetRecipeComponentsQuery,
} = api;
