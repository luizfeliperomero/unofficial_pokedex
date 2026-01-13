import axios from 'axios'

const api = 'http://localhost:8092/api/v1'

export const saveUser = async (email, password) => {
	const response = await axios.post(`${api}/user`, {
		email,
		password
	});
	return response;
}
