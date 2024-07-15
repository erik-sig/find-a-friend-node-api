import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository';
import { compare } from 'bcryptjs';
import { beforeEach, describe, expect, it } from 'vitest';
import { OrgAlreadyExistsError } from './errors/org-already-exists';
import { RegisterOrgUseCase } from './register-orgs';

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
let sut: RegisterOrgUseCase;

describe('Register Orgs Use Case', ()=>{

	beforeEach(()=>{
		orgsRepository = new InMemoryOrgsRepository();
		sut = new RegisterOrgUseCase(orgsRepository);
	});
	
	it('should be registered', async ()=>{
		const { org } = await sut.execute(dataTest);

		expect(org.id).toEqual(expect.any(String));
	});

	it('should hash org password upon registration', async ()=>{
		const { org } = await sut.execute(dataTest);

		const isPasswordCorrectlyHashed = await compare('123456',org.password);

		expect(isPasswordCorrectlyHashed).toBe(true);
	});

	it('should not be able to register with same email', async ()=>{


		await sut.execute(dataTest);

		expect(async ()=>{
			await sut.execute(dataTest);
		}).rejects.toBeInstanceOf(OrgAlreadyExistsError);
	});
});
