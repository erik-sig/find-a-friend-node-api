import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists';
import { makeRegisterPetUseCase } from '@/use-cases/factories/make-register-pet-use-case';

import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

//controllers are used to handle http requests and replies in a superior layer
export async function registerPets(request: FastifyRequest, reply: FastifyReply) {
	const registerPetBodySchema = z.object({
		name: z.string(),
		about: z.string(),
		age: z.string(),
		size: z.string(),
		race: z.string(),
		energy_level: z.string(),
		environment: z.string(),
	});
	const petData = registerPetBodySchema.parse(request.body);
	const authorizedOrgId = request.user.sub;
	try {
		const registerPetUseCase = makeRegisterPetUseCase();

		await registerPetUseCase.execute({...petData, org_id: authorizedOrgId});
	} catch (error) {
		if(error instanceof OrgAlreadyExistsError) //TODO: verify possible error to register a pet and replace this one
			return reply.status(409).send({message: error.message});
		
		throw error;
	}
	return reply.status(201).send('Sucesso ao cadastrar PET.');
}