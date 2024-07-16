import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found';
import { makeGetOrgUseCase } from '@/use-cases/factories/make-get-org-use-case';

import { FastifyReply, FastifyRequest } from 'fastify';

//controllers are used to handle http requests and replies in a superior layer
export async function getOrg(request: FastifyRequest, reply: FastifyReply) {
	try {
		const getOrgProfile = makeGetOrgUseCase();
		console.log(request.user.sub);
		const { org } = await getOrgProfile.execute({ 
			org_id: request.user.sub
		});

		return reply.status(200).send({
			org
		});
	} catch (error) {
		if(error instanceof ResourceNotFoundError)
			return reply.status(404).send({message: error.message});
		
		throw error;
	}
}