import { baseApi } from './baseApi';

const supplier = '/supplier';

const supplierApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		rechargeBalance: build.mutation({
			query: (data) => ({
				url: `${supplier}/recharge`,
				method: 'POST',
				data: data,
			}),
			invalidatesTags: ['supplier'],
		}),
		getTransactions: build.query({
			query: (data) => ({
				url: `${supplier}/transaction`,
				method: 'GET',
				params: data,
			}),
			providesTags: ['supplier'],
		}),
		getDeliveryPoint: build.query({
			query: (data) => ({
				url: `${supplier}/delivery-address`,
				method: 'GET',
				params: data,
			}),
			providesTags: ['supplier'],
		}),
		getDeliveryPointById: build.query({
			query: (id) => ({
				url: `${supplier}/delivery-address/${id}`,
				method: 'GET',
			}),
			providesTags: ['supplier', 'admin'],
		}),
		// deliver order by team id

		deliverOrder: build.mutation({
			query: (id) => ({
				url: `${supplier}/deliver/${id}`,
				method: 'POST',
			}),
			invalidatesTags: ['supplier'],
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
	}),
});

export const {
	useRechargeBalanceMutation,
	useGetTransactionsQuery,
	useGetDeliveryPointQuery,
	useGetDeliveryPointByIdQuery,
	useDeliverOrderMutation,
	useGetPickupPointByIdQuery,
	useGetPickupPointQuery,
	usePickupBoxesMutation,
} = supplierApi;
