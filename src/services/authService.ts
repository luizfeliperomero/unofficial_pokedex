import axios from 'axios'

const api = 'http://localhost:8092/api/v1'

export const authenticate = async (email, password) => {
	const response = await axios.post(`${api}/auth`, {
		email,	
		password
	})
	return response;
}
