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
                mode: 'no-cors'
            }),
            providesTags: ['Product']
        }),
        addWholeSaleOrder: builder.mutation<wholeSaleOrders, wholeSaleOrdersP> ({
            query: (body) => ({
                url: '/wholesale-orders',
                method: 'POST',
                mode: 'no-cors',
                body: new URLSearchParams(body as any).toString(),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }),
            invalidatesTags: ['Product']
        })
    })
})
export const {
    useGetWholeSaleOrdersQuery,
    useAddWholeSaleOrderMutation,
} = api;
