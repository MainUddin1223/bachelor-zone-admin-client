import { baseApi } from './baseApi';

const adminUrl = '/admin';

const adminApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		createAddress: build.mutation({
			query: (category: any) => ({
				url: `${adminUrl}/address`,
				method: 'POST',
				data: category,
			}),
			invalidatesTags: ['admin'],
		}),
		createTeam: build.mutation({
			query: (data: any) => ({
				url: `${adminUrl}/team`,
				method: 'POST',
				data,
			}),
			invalidatesTags: ['admin'],
		}),
		login: build.mutation({
			query: (data) => ({
				url: `/auth/admin-login`,
				method: 'POST',
				data: data,
			}),
			invalidatesTags: ['admin'],
		}),
		getUserInfo: build.mutation({
			query: (data) => ({
				url: `${adminUrl}/user-info`,
				method: 'PATCH',
				data,
			}),
			invalidatesTags: ['admin'],
		}),
		updateDueBoxes: build.mutation({
			query: (data) => ({
				url: `${adminUrl}/boxes/${data?.id}`,
				method: 'PATCH',
				data: {
					amount: data.amount,
				},
			}),
			invalidatesTags: ['admin'],
		}),
		getTeams: build.query({
			query: (data) => ({
				url: `${adminUrl}/team`,
				method: 'GET',
				params: data,
			}),
			providesTags: ['admin'],
		}),
		getTeamById: build.query({
			query: (id) => ({
				url: `${adminUrl}/team/${id}`,
				method: 'GET',
			}),
			providesTags: ['admin'],
		}),
		getTeamOrders: build.query({
			query: (data) => ({
				url: `${adminUrl}/orders`,
				method: 'GET',
				params: data,
			}),
			providesTags: ['admin'],
		}),
		deliverOrder: build.mutation({
			query: (id) => ({
				url: `${adminUrl}/orders/${id}`,
				method: 'PATCH',
			}),
			invalidatesTags: ['admin'],
		}),
		getUsers: build.query({
			query: (data) => ({
				url: `${adminUrl}/users`,
				method: 'GET',
				params: data,
			}),
			providesTags: ['admin'],
		}),
		getUserById: build.query({
			query: (id) => ({
				url: `${adminUrl}/users/${id}`,
				method: 'GET',
			}),
			providesTags: ['admin'],
		}),
		getUnclaimedUser: build.query({
			query: (id) => ({
				url: `${adminUrl}/unclaimed-users/${id}`,
				method: 'GET',
			}),
			providesTags: ['admin'],
		}),
		getAdminStatics: build.query({
			query: () => ({
				url: `${adminUrl}/statics`,
				method: 'GET',
			}),
			providesTags: ['admin'],
		}),
		changeTeam: build.mutation({
			query: (data) => ({
				url: `${adminUrl}/change-team`,
				method: 'POST',
				data,
			}),
			invalidatesTags: ['admin'],
		}),
		rechargeBalance: build.mutation({
			query: (data) => ({
				url: `${adminUrl}/recharge`,
				method: 'POST',
				data,
			}),
			invalidatesTags: ['admin'],
		}),
		refundBalance: build.mutation({
			query: (data) => ({
				url: `${adminUrl}/refund`,
				method: 'POST',
				data,
			}),
			invalidatesTags: ['admin'],
		}),
		claimUser: build.mutation({
			query: (data) => ({
				url: `${adminUrl}/claim-user`,
				method: 'POST',
				data,
			}),
			invalidatesTags: ['admin'],
		}),
		addExpense: build.mutation({
			query: (data) => ({
				url: `${adminUrl}/expense`,
				method: 'POST',
				data,
			}),
			invalidatesTags: ['admin'],
		}),
		getExpenses: build.query({
			query: (data) => ({
				url: `${adminUrl}/expense`,
				method: 'GET',
				params: data,
			}),
			providesTags: ['admin'],
		}),
	}),
});

export const {
	useCreateAddressMutation,
	useLoginMutation,
	useCreateTeamMutation,
	useGetTeamsQuery,
	useGetUserInfoMutation,
	useGetTeamByIdQuery,
	useUpdateDueBoxesMutation,
	useGetTeamOrdersQuery,
	useDeliverOrderMutation,
	useGetUsersQuery,
	useGetUserByIdQuery,
	useChangeTeamMutation,
	useRechargeBalanceMutation,
	useRefundBalanceMutation,
	useGetUnclaimedUserQuery,
	useClaimUserMutation,
	useGetAdminStaticsQuery,
	useAddExpenseMutation,
	useGetExpensesQuery,
} = adminApi;
