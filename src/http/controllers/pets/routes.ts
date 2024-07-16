import { FastifyInstance } from 'fastify';
import { verifyJWT } from '../../middlewares/verify-jwt';
import { deletePet } from './delete-pet';
import { getPet } from './get-pet';
import { registerPets } from './register-pets';
import { searchPets } from './search-pets';

export async function petsRoutes(app: FastifyInstance) {
	app.post('/pets',{ onRequest: [verifyJWT] }, registerPets);
	app.get('/pets/:pet_id', getPet);
	app.get('/pets', searchPets);
	app.delete('/pets/:pet_id',{ onRequest: [verifyJWT] },deletePet);
}