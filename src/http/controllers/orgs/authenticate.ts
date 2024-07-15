import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';
import { makeAuthenticateOrgUseCase } from '@/use-cases/factories/make-authenticate-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

//controllers are used to handle http requests and replies in a superior layer
export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
	const authenticateBodySchema = z.object({
		email: z.string(),
		password: z.string()
	});
	const {email, password} = authenticateBodySchema.parse(request.body);

	
	try {
		const authenticateUseCase = makeAuthenticateOrgUseCase();

		const { org } = await authenticateUseCase.execute({
			email,
			password
		});

		const token = await reply.jwtSign({}, {
			sign: {
				sub: org.id
			}
		});

		return reply.status(200).send({ token });
	} catch (error) {
		if(error instanceof InvalidCredentialsError)
			return reply.status(400).send({message: error.message});
		
		throw error;
	}
}