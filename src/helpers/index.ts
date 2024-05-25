export const debounced = (query: string, delay: number) => {
	console.log(query);
	setTimeout(() => {
		if (!query.length) {
			return false;
		}
		return true;
	}, delay);
};
