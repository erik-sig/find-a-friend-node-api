import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found';
import { makeDeletePetUseCase } from '@/use-cases/factories/make-delete-pet-use-case';

import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

//controllers are used to handle http requests and replies in a superior layer
export async function deletePet(request: FastifyRequest, reply: FastifyReply) {
	const deletePetParamsSchema = z.object({
		pet_id: z.string().uuid()
	});

	const { pet_id } = deletePetParamsSchema.parse(request.params);
 
	try {
		const deletePetUseCase = makeDeletePetUseCase();

		const { pet } = await deletePetUseCase.execute({pet_id});

		return reply.status(200).send({
			pet
		});
	} catch (error) {
		if(error instanceof ResourceNotFoundError)
			return reply.status(404).send({message: error.message});
		
		throw error;
	}
}