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

export const savePokemon = async(pokemon) => {
	const response = await api.post("/user/pokemon", {
		pokemon
	});
	return response;
}

export const deletePokemon = async(pokemonName) => {
	const response = await api.delete("/user/pokemon", {
		data: { pokemonName	}
	});
	return response;
}
