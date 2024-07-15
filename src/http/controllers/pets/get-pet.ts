import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found';
import { makeGetPetUseCase } from '@/use-cases/factories/make-get-pet-use-case';

import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

//controllers are used to handle http requests and replies in a superior layer
export async function getPet(request: FastifyRequest, reply: FastifyReply) {
	const getPetParamsSchema = z.object({
		pet_id: z.string().uuid()
	});

	const { pet_id } = getPetParamsSchema.parse(request.params);
 
	try {
		const getPetUseCase = makeGetPetUseCase();

		const { pet } = await getPetUseCase.execute({pet_id});

		return reply.status(200).send({
			pet
		});
	} catch (error) {
		if(error instanceof ResourceNotFoundError)
			return reply.status(404).send({message: error.message});
		
		throw error;
	}
}