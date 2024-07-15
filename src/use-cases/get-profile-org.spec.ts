import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { ResourceNotFoundError } from './errors/resource-not-found';
import { GetOrgUseCase } from './get-profile-org';

const dataTest = {
	author_name: 'OrgTest1',
	email: 'orgteste@gmail.com',
	whatsapp: '18449399',
	password: '123456',
	cep: '12341-23',
	state: 'Sao pualo',
	city: 'Sao Paulo',
	neighborhood: 'teste',
	street: 'rua teste',
	latitude: 1231,
	longitude: 1234,
};

let orgsRepository: InMemoryOrgsRepository;
let sut: GetOrgUseCase;

describe('Get Orgs Use Case', ()=>{

	beforeEach(()=>{
		orgsRepository = new InMemoryOrgsRepository();
		sut = new GetOrgUseCase(orgsRepository);
	});

	it('should be able to get a ORG profile', async ()=>{

		const userTest = await orgsRepository.create(dataTest);

		const { org } = await sut.execute({org_id: userTest.id});

		expect(org?.id).toEqual(expect.any(String));
	});
	
	it('should not be able to get a ORG profile', async ()=>{

		expect(async ()=>{
			await sut.execute({org_id:'12345'});
		}).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	
});
