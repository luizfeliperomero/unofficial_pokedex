import api from './api.js'

export const saveUser = async (email, password) => {
	const response = await api.post("/user", {
		email,
		password
	});
	return response;
}

export const getUser = async () => {
	const response = await api.get("/user");
	return response;
}

export const getEmail = async () => {
	const response = await api.get("/user/email");
	return response;
}
