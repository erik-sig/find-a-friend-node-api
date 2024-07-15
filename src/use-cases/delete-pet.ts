import { PetsRepository } from '@/repositories/pets-repository';
import { Pet } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found';

interface DeletePetUseCaseRequest {
 pet_id: string
}

interface DeletePetUseCaseResponse {
	pet: Pet | null
}

export class DeletePetUseCase {
	constructor(private petsRepository: PetsRepository){}

	async execute({ pet_id }: DeletePetUseCaseRequest):Promise<DeletePetUseCaseResponse> {
	
		const pet = await this.petsRepository.delete(pet_id);

		if(!pet)
			throw new ResourceNotFoundError();

		return { pet };
	}
}
