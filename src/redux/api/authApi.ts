import { baseApi } from './baseApi';

const authUrl = '/auth';

const authApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		userLogin: build.mutation({
			query: (loginData) => ({
				url: `${authUrl}/login`,
				method: 'POST',
				data: loginData,
			}),
			invalidatesTags: ['user'],
		}),
		signUp: build.mutation({
			query: (signUpData) => ({
				url: `${authUrl}/sign-up`,
				method: 'POST',
				data: signUpData,
			}),
			invalidatesTags: ['user'],
		}),
	}),
});

export const { useUserLoginMutation, useSignUpMutation } = authApi;
