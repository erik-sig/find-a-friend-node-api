import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository';
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { RegisterPetUseCase } from './register-pets';

const dataTest = {
	name:'dog',
	about:'Dog frances',
	age:'123',
	size:'Grande',
	race: 'Bulldog',
	energy_level:'safado',
	environment:'ambiente grande',
	org_id:'12312',
};

let petsRepository: InMemoryPetsRepository;
let orgsRepository: InMemoryOrgsRepository;
let sut: RegisterPetUseCase;

describe('Register Pets Use Case', ()=>{

	beforeEach(()=>{
		orgsRepository = new InMemoryOrgsRepository();
		petsRepository = new InMemoryPetsRepository(orgsRepository);
		sut = new RegisterPetUseCase(orgsRepository, petsRepository);
	});
	
	it('should be registered', async ()=>{
		const { pet } = await sut.execute(dataTest);

		console.log(pet);
		expect(pet.id).toEqual(expect.any(String));
	});
});
