import baseApi from "./baseApi";

const reportApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        allReport: builder.query({
            query: () => ({
                url: `/reports/all-reports`,
                method: "GET",
            }),
        }),
        deleteReport: builder.mutation({
            query: (id) => ({
                url: `/reports/${id}`,
                method: "DELETE",
            }),
        })
    }),
})

export const { useAllReportQuery, useDeleteReportMutation } = reportApi;