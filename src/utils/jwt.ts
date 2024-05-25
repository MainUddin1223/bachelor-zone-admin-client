import { jwtDecode } from 'jwt-decode';
import { getFromLocalStorage } from './local-storage';

export const decodeToken = (token: string) => {
	return jwtDecode(token);
};

export const getAuthInfo = () => {
	const getToken = getFromLocalStorage('accessToken');
	if (!getToken) return '';
	return decodeToken(getToken);
};
