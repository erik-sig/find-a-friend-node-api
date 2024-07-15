import { OrgsRepository } from '@/repositories/orgs-repository';
import { PetsRepository } from '@/repositories/pets-repository';
import { Pet } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found';

interface RegisterPetsUseCaseRequest {
	name: string;
	about: string;
	age: string;
	size: string;
	energy_level: string;
	environment: string;
	race: string
	org_id: string;
}

interface RegisterPetsUseCaseResponse {
	pet: Pet;
}

export class RegisterPetUseCase {
	constructor(
		private orgsRepository: OrgsRepository,
		private petsRepository: PetsRepository
	) { }

	async execute(
		petData: RegisterPetsUseCaseRequest
	): Promise<RegisterPetsUseCaseResponse> {

		const org = this.orgsRepository.findById(petData.org_id);
	
		if(!org)
			throw new ResourceNotFoundError();

		const pet = await this.petsRepository.create(petData);

		return { pet };
	}
}
