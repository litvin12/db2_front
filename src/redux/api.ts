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
export type medicine = {
    name: string;
    type: string;
    recipeId: number;
    criticalNorm: number;
    quantity: number;
    price: number;
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
    title: string;
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

export type whosaleBatch = {
    id: number;
    status: string;
    createdAt: string;
    updatedAt: string;
}


export type wholesaleBatchID = {
    batchId: number;
    wholesaleOrderId: number;
    medicineId: number;
    quantity: number;
    wholesaleOrderStatus: string;
    wholesaleOrderCreatedAt: string;
    wholesaleOrderUpdatedAt: string;
    medicineName: string;
    medicineType: string;
    medicinePrice: number;
}
export type editRecipe = {
    title: string;
    technology: string;
    preparationTime: string;
}
export type addRecipe = {
    title: string;
    technology: string;
    preparationTime: string;
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
        addWholeSaleOrder: builder.mutation<void, wholeSaleOrdersP>({
            query: (body) => ({
                url: '/wholesale-orders',
                method: 'POST',
                body,
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
        }),
        getWhosaleBatch: builder.query<whosaleBatch[], void>({
            query: () => ({
                url: '/wholesale-batches',
                method: 'GET'
            }),
            providesTags: ['Product']
        }),
        addWholesaleBatch: builder.mutation<void, void>({
            query: () => ({
                url: '/wholesale-batches',
                method: 'POST',
            }),
            invalidatesTags: ['Product']
        }),
        getWholesaleBatchID: builder.query<wholesaleBatchID[], { id: number }>({
            query: (id) => ({
                url: `/wholesale-batches/${id}/orders`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }

            }),
            providesTags: ['Product']
        }),
        editStatusBatch: builder.mutation<void, { id: number, status: string }>({
            query: ({ id, status }) => ({
                url: `/wholesale-batches/${id}`,
                method: 'PATCH',
                body: { status }
            }),
            invalidatesTags: ['Product']
        }),
        getOrdersUser: builder.query<getOrder[], { id: number }>({
            query: (id) => ({
                url: `/orders/user/${id}`,
                method: 'GET'
            }),
            providesTags: ['Product']
        }),
        addMedicine: builder.mutation<void, medicine>({
            query: (body) => ({
                url: '/medicines',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Product']
        }),
        deleteMedicine: builder.mutation<void, { id: number }>({
            query: (id) => ({
                url: `/medicines/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Product']
        }),
        editMedicine: builder.mutation<void, { medicine: medicine, id: number }>({
            query: ({ medicine, id }) => ({
                url: `/medicines/${id}`,
                method: 'PATCH',
                body: medicine,
            }),
            invalidatesTags: ['Product']
        }),
        deleteWholesaleOrder: builder.mutation<void, { id: number }>({
            query: (id) => ({
                url: `/wholesale-orders/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Product']
        }),
        deleteWholesaleBatch: builder.mutation<void, { id: number }>({
            query: (id) => ({
                url: `/wholesale-batches/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Product']
        }),
        editRecipe: builder.mutation<void, { editRecipe: editRecipe, id: number }>({
            query: ({ editRecipe, id }) => ({
                url: `/recipes/${id}`,
                method: 'PATCH',
                body: editRecipe,
            }),
            invalidatesTags: ['Product']
        }),
        addRecipe: builder.mutation<void, addRecipe>({
            query: (body) => ({
                url: '/recipes',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Product']
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
    useGetWhosaleBatchQuery,
    useAddWholesaleBatchMutation,
    useGetWholesaleBatchIDQuery,
    useEditStatusBatchMutation,
    useGetOrdersUserQuery,
    useAddMedicineMutation,
    useDeleteMedicineMutation,
    useEditMedicineMutation,
    useDeleteWholesaleOrderMutation,
    useDeleteWholesaleBatchMutation,
    useEditRecipeMutation,
    useAddRecipeMutation,
} = api;
