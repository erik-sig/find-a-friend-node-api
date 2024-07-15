import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository';
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { GetPetUseCase } from './get-pet';

let petsRepository: InMemoryPetsRepository;
let orgsRepository: InMemoryOrgsRepository;
let sut: GetPetUseCase;

describe('Get Pets Use Case', ()=>{

	beforeEach(()=>{
		orgsRepository = new InMemoryOrgsRepository();
		petsRepository = new InMemoryPetsRepository(orgsRepository);
		sut = new GetPetUseCase(petsRepository);
	});

	it('should be able to get a PET profile', async ()=>{
		const createdPet = await petsRepository.create({
			id:'123',
			about:'louco',
			age:'123',
			energy_level:'123',
			environment:'123',
			name:'bala da tijuca',
			race: 'Bulldog',
			size:'gigante',
			org_id:'12345'
		});

		const { pet } = await sut.execute({pet_id: createdPet.id});
  
		expect(pet?.id).toEqual(expect.any(String));
	});
});
