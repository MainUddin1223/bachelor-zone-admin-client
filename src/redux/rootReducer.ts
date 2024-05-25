import { baseApi } from './api/baseApi';
import basicSlice from './slice/basicSlice';

export const reducer = {
	basicSlice: basicSlice,
	[baseApi.reducerPath]: baseApi.reducer,
};
