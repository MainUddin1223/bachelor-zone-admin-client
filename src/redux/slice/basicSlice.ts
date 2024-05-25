import { createSlice } from '@reduxjs/toolkit';
type IBasicSlice = {
	basicData: {
		lang: string | undefined;
		isLoggedIn: boolean;
	};
};

const initialState: IBasicSlice = {
	basicData: {
		lang: undefined,
		isLoggedIn: false,
	},
};

export const basicSlice = createSlice({
	name: 'basicData',
	initialState,
	reducers: {
		addBasicData: (state, action) => {
			state.basicData = action.payload;
		},
	},
});
export const { addBasicData } = basicSlice.actions;

export default basicSlice.reducer;
