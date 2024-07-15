import fastifyJwt from '@fastify/jwt';
import { env } from 'env';
import fastify from 'fastify';
import { ZodError } from 'zod';
import { orgsRoutes } from './http/controllers/orgs/routes';
import { petsRoutes } from './http/controllers/pets/routes';

export const app = fastify();
app.register(orgsRoutes);
app.register(petsRoutes);

app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
	sign: {
		expiresIn: '7d'
	}
});

app.setErrorHandler((error, _, reply)=>{
	if(error instanceof ZodError){
		return reply.status(400).send({message: 'Validation error.', issues: error.format()});
	}

	if(env.NODE_ENV!=='production'){
		console.error(error);
	}else {
		//LOG DE ERROS
	}

	return reply.status(500).send({message: 'Internal server error.'});
});