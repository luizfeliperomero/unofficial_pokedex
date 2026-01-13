import api from './api.js'

export const saveUser = async (email, password) => {
	const response = await api.post("/user", {
		email,
		password
	});
	return response;
}

export const getUser = async () => {
	const token = localStorage.getItem("token");
	const response = await api.get("/user");
	return response;
}
