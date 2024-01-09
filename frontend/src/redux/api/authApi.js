import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const authApi=createApi({
    reducerPath:'authApi',
    baseQuery:fetchBaseQuery({baseUrl:""}),
    endpoints:(builder)=>({
        
        login:builder.mutation({
            query(body){
                return{
                    url:"/api/login",
                    method:"POST",
                    body,
                }
            }
        }),

        register:builder.mutation({
            query(body){
                return{
                    url:"/api/register",
                    method:"POST",
                    body,
                }
            }
        }),

    })
})

export const {useLoginMutation,useRegisterMutation}=authApi;