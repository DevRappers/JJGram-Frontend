export const defaults = {
	isLoggedIn: localStorage.getItem('token') !== null ? true : false
};

export const resolvers = {
	Mutation: {
		logUserIn: (_, { token }, { cache }) => {
			localStorage.setItem('token', token);
			cache.writeData({
				data: {
					isLoggedIn: true
				}
			});
			return null;
		},
		logUserOut: (_, __, { cache }) => {
			localStorage.removeItem('token');
			// 전체 페이지 reload
			window.location.reload();
			return null;
		}
	}
};
