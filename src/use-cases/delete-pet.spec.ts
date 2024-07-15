import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository';
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { DeletePetUseCase } from './delete-pet';

let petsRepository: InMemoryPetsRepository;
let orgsRepository: InMemoryOrgsRepository;
let sut: DeletePetUseCase;

describe('Delete Pet Use Case', ()=>{

	beforeEach(()=>{
		orgsRepository = new InMemoryOrgsRepository();
		petsRepository = new InMemoryPetsRepository(orgsRepository);
		sut = new DeletePetUseCase(petsRepository);
	});

	it('should be able to delete a PET profile', async ()=>{
		await petsRepository.create({
			about:'louco',
			age:'123',
			energy_level:'123',
			environment:'123',
			name:'bala da tijuca',
			race: 'Bulldog',
			size:'gigante',
			org_id:'12345'
		});
		await petsRepository.create({
			about:'lodsdsdsuco',
			age:'123',
			energy_level:'123',
			environment:'123',
			name:'bala da tijuca',
			race: 'Bulldog',
			size:'gigante',
			org_id:'12345'
		});
		const test = await petsRepository.create({
			about:'louaaaaaco',
			age:'123',
			energy_level:'123',
			environment:'123',
			name:'bala da tijuca',
			race: 'Bulldog',
			size:'gigante',
			org_id:'12345'
		});

		await sut.execute({pet_id: test.id});
		expect(petsRepository.items).toHaveLength(2);
	});
});
