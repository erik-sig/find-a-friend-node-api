import { PetsRepository } from '@/repositories/pets-repository';
import { Pet } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found';

interface SearchPetsUseCaseRequest {
	age?: string;
	size?: string;
	energy_level?: string;
	environment?: string;
	race?: string
  city: string
}

interface SearchPetsUseCaseResponse {
	pets: Pet[];
}

export class SearchPetUseCase {
	constructor(
		private petsRepository: PetsRepository
	) {}

	async execute(
		params: SearchPetsUseCaseRequest
	): Promise<SearchPetsUseCaseResponse> {

		if(!params.city)
			throw new ResourceNotFoundError();

		const pets = await this.petsRepository.findAll(params);

		return { pets };
	}
}
