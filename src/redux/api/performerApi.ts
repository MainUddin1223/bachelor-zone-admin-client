import { baseApi } from './baseApi';

const performerUrl = '/performer';

const performerApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getCategories: build.query({
			query: () => ({
				url: `${performerUrl}/categories`,
				method: 'GET',
			}),
			providesTags: ['performer', 'admin'],
		}),
		getTestById: build.query({
			query: (id) => ({
				url: `${performerUrl}/my-tests/${id}`,
				method: 'GET',
			}),
			providesTags: ['performer'],
		}),
		getMyTests: build.query({
			query: () => ({
				url: `${performerUrl}/my-tests`,
				method: 'GET',
			}),
			providesTags: ['performer'],
		}),
		giveTest: build.mutation({
			query: (id) => ({
				url: `${performerUrl}/request-test/${id}`,
				method: 'POST',
			}),
			invalidatesTags: ['performer'],
		}),
		submitAnswer: build.mutation({
			query: (data) => ({
				url: `${performerUrl}/verify-answer/${data.id}`,
				method: 'PATCH',
				data: data.answer,
			}),
			invalidatesTags: ['performer'],
		}),
		completeTest: build.mutation({
			query: (id) => ({
				url: `${performerUrl}/my-tests/${id}`,
				method: 'PATCH',
			}),
			invalidatesTags: ['performer'],
		}),
		getLeaderBoard: build.query({
			query: () => ({
				url: `${performerUrl}/leader-board`,
				method: 'GET',
			}),
			providesTags: ['performer'],
		}),
		getMyStatics: build.query({
			query: () => ({
				url: `${performerUrl}/my-statics`,
				method: 'GET',
			}),
			providesTags: ['performer'],
		}),
	}),
});

export const {
	useGetCategoriesQuery,
	useGiveTestMutation,
	useGetTestByIdQuery,
	useGetMyTestsQuery,
	useSubmitAnswerMutation,
	useCompleteTestMutation,
	useGetLeaderBoardQuery,
	useGetMyStaticsQuery,
} = performerApi;
