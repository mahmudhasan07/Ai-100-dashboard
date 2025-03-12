import baseApi from "./baseApi";

const postApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        singlePost: build.query({
            query: (id) => ({
                url: `/posts/${id}`,
                method: "GET"
            })
        })
    }),
})

 export const { useSinglePostQuery } = postApi