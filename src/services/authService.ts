import axios from 'axios'

const api = import.meta.env.VITE_POKEMON_SERVICE_URL;

export const authenticate = async (email, password) => {
	const response = await axios.post(`${api}/auth`, {
		email,	
		password
	})
	return response;
}
