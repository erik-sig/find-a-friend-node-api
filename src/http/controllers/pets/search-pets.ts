import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found';
import { makeSearchPetsUseCase } from '@/use-cases/factories/make-search-pets-use-case';

import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

//controllers are used to handle http requests and replies in a superior layer
export async function searchPets(request: FastifyRequest, reply: FastifyReply) {
	const searchPetsParamsSchema = z.object({
		city: z.string(),
		age: z.string().optional(),
		size: z.string().optional(),
		race: z.string().optional(),
		energy_level: z.string().optional(),
		environment: z.string().optional(),
	});
	const searchParams = searchPetsParamsSchema.parse(request.query);
	
	try {
		const searchPetsUseCase = makeSearchPetsUseCase();

		const pets = await searchPetsUseCase.execute(searchParams);
		return reply.status(200).send(
			pets
		);
	} catch (error) {
		if(error instanceof ResourceNotFoundError) //TODO: verify possible error to register a pet and replace this one
			return reply.status(409).send({message: error.message});
		
		throw error;
	}

}