import { OrgsRepository } from '@/repositories/orgs-repository';
import { Org } from '@prisma/client';
import { hash } from 'bcryptjs';
import { OrgAlreadyExistsError } from './errors/org-already-exists';

interface RegisterOrgsUseCaseRequest {
  author_name: string,
  email: string,
  whatsapp: string,
  password: string,
  cep: string,
  state: string,
  city: string,
  neighborhood: string,
  street: string,
  latitude: number,
  longitude: number,
}

interface RegisterOrgsUseCaseResponse {
	org: Org
}

export class RegisterOrgUseCase {
	constructor(private orgsRepository: OrgsRepository){}

	async execute(orgData: RegisterOrgsUseCaseRequest):Promise<RegisterOrgsUseCaseResponse> {
		const userWithSameEmail = await this.orgsRepository.findByEmail(orgData.email);

		if(userWithSameEmail){
			throw new OrgAlreadyExistsError();
		}
    
		const password_hash = await hash(orgData.password, 6);

		//Password hashing to create a security data in DB
		const TransformedOrgData = {...orgData, password: password_hash};
		//Create a new org in DB
		const org = await this.orgsRepository.create(TransformedOrgData);

		return {
			org
		};
	}
}
