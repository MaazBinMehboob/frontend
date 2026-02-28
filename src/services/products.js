import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
    reducerPath: 'forfile',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/files",
        credentials: 'include'
    }),
    endpoints: (build)=>({
       
        sendfile : build.mutation({
            query : (uploadfile)=>({
                url: '/upload',
                method: 'POST',
                body: uploadfile
            })
        }),
        updateProduct: build.mutation({
            query: ({id, ...updatedFields}) => ({
                url : `/updateProduct/${id}`,
                method: 'PUT',
                body: updatedFields
            })
        }),

        deleteProduct: build.mutation({
            query: (id)=>({
                url: `/deleteProduct/${id}`,
                method: 'DELETE'
            })
        })
    })
})

export const {useGetProductsQuery, useAddProductMutation, useUpdateProductMutation, useDeleteProductMutation} = productApi