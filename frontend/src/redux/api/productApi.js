import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const productApi=createApi({
    reducerPath:'productApi',
    baseQuery:fetchBaseQuery({baseUrl:""}),
    endpoints:(builder)=>({
        getProducts:builder.query({
            query:(params)=>({
                url:"/products",
                params:{
                    page:params?.page,
                }
            })
        }),
        getProductDetails:builder.query({
            query:(id)=>({
                url:`/products/${id}`
            })
        }),

    })
})

export const {useGetProductsQuery,useGetProductDetailsQuery}=productApi;