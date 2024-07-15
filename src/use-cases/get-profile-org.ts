import { OrgsRepository } from '@/repositories/orgs-repository';
import { Org } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found';

interface GetOrgUseCaseRequest {
 org_id: string
}

interface GetOrgUseCaseResponse {
	org: Org | null
}

export class GetOrgUseCase {
	constructor(private orgsRepository: OrgsRepository){}

	async execute({ org_id }: GetOrgUseCaseRequest):Promise<GetOrgUseCaseResponse> {
	
		const org = await this.orgsRepository.findById(org_id);

		if(!org)
			throw new ResourceNotFoundError();

		return { org };
	}
}
