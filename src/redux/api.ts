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
export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080',
    }),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        getWholeSaleOrders: builder.query<wholeSaleOrders[], void> ({
            query: () => ({
                url: '/wholesale-orders',
                method: 'GET',
            }),
            providesTags: ['Product']
        }),
        getMedic: builder.query<wholeSaleOrders[], void> ({
            query: () => ({
                url: '/medicines',
                method: 'GET',
            }),
            providesTags: ['Product']
        }),
        addWholeSaleOrder: builder.mutation<wholeSaleOrders, wholeSaleOrdersP> ({
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
        getUser: builder.query<user[], void> ({
            query: () => ({
                url: '/users',
                method: 'GET',
            }),
            providesTags: ['Product']
        }),
        getMedicines: builder.query<medicines[], void> ({
            query: () => ({
                url: '/medicines',
                method: 'GET',
            }),
            providesTags: ['Product']
        }),

    })
})
export const {
    useGetWholeSaleOrdersQuery,
    useAddWholeSaleOrderMutation,
    useGetMedicQuery,
    useGetUserQuery,
    useGetMedicinesQuery,
} = api;
