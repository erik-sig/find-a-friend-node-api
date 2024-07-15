import { PetsRepository } from '@/repositories/pets-repository';
import { Pet } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found';

interface GetPetUseCaseRequest {
 pet_id: string
}

interface GetPetUseCaseResponse {
	pet: Pet | null
}

export class GetPetUseCase {
	constructor(private petsRepository: PetsRepository){}

	async execute({ pet_id }: GetPetUseCaseRequest):Promise<GetPetUseCaseResponse> {
	
		const pet = await this.petsRepository.findById(pet_id);

		if(!pet)
			throw new ResourceNotFoundError();

		return { pet };
	}
}
