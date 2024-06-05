import { baseApi } from './baseApi';

const supplier = '/supplier';

const supplierApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getDeliveryPoint: build.query({
			query: (data) => ({
				url: `${supplier}/delivery-address`,
				method: 'GET',
				params: data,
			}),
			providesTags: ['supplier', 'admin'],
		}),
		// submitAnswer: build.mutation({
		// 	query: (data) => ({
		// 		url: `${supplier}/verify-answer/${data.id}`,
		// 		method: 'PATCH',
		// 		data: data.answer,
		// 	}),
		// 	invalidatesTags: ['performer'],
		// }),
		// completeTest: build.mutation({
		// 	query: (id) => ({
		// 		url: `${supplier}/my-tests/${id}`,
		// 		method: 'PATCH',
		// 	}),
		// 	invalidatesTags: ['performer'],
		// }),
	}),
});

export const { useGetDeliveryPointQuery } = supplierApi;
