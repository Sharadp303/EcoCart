import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { userApi } from './userApi';

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
            },
            async onQueryStarted(args,{dispatch,queryFulfilled}){
                try{
                    await queryFulfilled;
                    await dispatch(userApi.endpoints.getMe.initiate(null))
                }
                catch(error){
                    console.log(error);
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

        logout:builder.query({
            query:()=>"/api/logout"
        })

    })
})

export const {useLoginMutation,useRegisterMutation,useLazyLogoutQuery}=authApi;