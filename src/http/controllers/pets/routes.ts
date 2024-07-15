import { FastifyInstance } from 'fastify';
import { verifyJWT } from '../../middlewares/verify-jwt';
import { getPet } from './get-pet';
import { registerPets } from './register-pets';
import { searchPets } from './search-pets';

export async function petsRoutes(app: FastifyInstance) {
	app.addHook('onRequest', verifyJWT);

	//verify User with JTW
	app.post('/pets', registerPets);
	app.get('/pets/:pet_id', getPet);
	app.get('/pets', searchPets);
}