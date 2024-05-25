import { createSlice } from '@reduxjs/toolkit';
type IAuthSlice = {
	authData: {
		name: string;
		email: string;
		rank?: number | undefined;
	};
};

const initialState: IAuthSlice = {
	authData: {
		name: '',
		email: '',
		rank: undefined,
	},
};

export const authSlice = createSlice({
	name: 'authData',
	initialState,
	reducers: {
		addAuthData: (state, action) => {
			state.authData = action.payload;
		},
	},
});
export const { addAuthData } = authSlice.actions;

export default authSlice.reducer;
