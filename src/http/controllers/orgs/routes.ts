import { FastifyInstance } from 'fastify';
import { verifyJWT } from '../../middlewares/verify-jwt';
import { authenticate } from './authenticate';
import { getOrg } from './profile-org';
import { registerOrgs } from './register-orgs';

export async function orgsRoutes(app: FastifyInstance) {
	app.post('/orgs', registerOrgs);
	app.post('/sessions', authenticate);

	//verify User with JTW
	app.get('/me', {onRequest:[verifyJWT]}, getOrg);
}