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
		getDeliveryPointById: build.query({
			query: (id) => ({
				url: `${supplier}/delivery-address/${id}`,
				method: 'GET',
			}),
			providesTags: ['supplier', 'admin'],
		}),
		getPickupPoint: build.query({
			query: (data) => ({
				url: `${supplier}/pickup`,
				method: 'GET',
				params: data,
			}),
			providesTags: ['supplier'],
		}),
		getPickupPointById: build.query({
			query: (id) => ({
				url: `${supplier}/pickup/${id}`,
				method: 'GET',
			}),
			providesTags: ['supplier'],
		}),
		pickupBoxes: build.mutation({
			query: (id) => ({
				url: `${supplier}/pick-up/${id}`,
				method: 'POST',
			}),
			invalidatesTags: ['supplier'],
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

export const {
	useGetDeliveryPointQuery,
	useGetDeliveryPointByIdQuery,
	useGetPickupPointByIdQuery,
	useGetPickupPointQuery,
	usePickupBoxesMutation,
} = supplierApi;
