import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists';
import { makeRegisterOrgUseCase } from '@/use-cases/factories/make-register-org-use-case';

import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

//controllers are used to handle http requests and replies in a superior layer
export async function registerOrgs(request: FastifyRequest, reply: FastifyReply) {
	const registerOrgBodySchema = z.object({
		author_name: z.string(),
		email: z.string().email(),
		whatsapp: z.string(),
		password: z.string().min(6),
		cep: z.string(),
		state: z.string(),
		city: z.string(),
		neighborhood: z.string(),
		street: z.string(),
		latitude: z.number(),
		longitude: z.number(),
	});
	const orgData = registerOrgBodySchema.parse(request.body);
	
	try {
		const registerOrgUseCase = makeRegisterOrgUseCase();

		await registerOrgUseCase.execute(orgData);
	} catch (error) {
		if(error instanceof OrgAlreadyExistsError)
			return reply.status(409).send({message: error.message});
		
		throw error;
	}
	return reply.status(201).send('Sucesso ao cadastrar ORG.');
}