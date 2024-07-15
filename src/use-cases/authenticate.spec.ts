import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository';
import { hash } from 'bcryptjs';
import { beforeEach, describe, expect, it } from 'vitest';
import { AuthenticateUseCase } from './authenticate';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';


let orgsRepository: InMemoryOrgsRepository;
let sut: AuthenticateUseCase;

describe('Authenticate Use Case', ()=>{
	
	beforeEach(()=>{
		orgsRepository = new InMemoryOrgsRepository();
		sut = new AuthenticateUseCase(orgsRepository);
	});

	it('should be able to authenticate', async ()=>{
		await orgsRepository.create({
			author_name: 'OrgTest1',
			email: 'orgteste@gmail.com',
			whatsapp: '18449399',
			password: await hash('123456',6),
			cep: '12341-23',
			state: 'Sao paulo',
			city: 'Sao Paulo',
			neighborhood: 'teste',
			street: 'rua teste',
			latitude: 1231,
			longitude: 1234,
		});

		const { org } = await sut.execute({
			email: 'orgteste@gmail.com',
			password: '123456'
		});

		expect(org.id).toEqual(expect.any(String));
	});

	it('should not be able to authenticate with wrong email', async ()=>{
		expect(async ()=> await sut.execute({
			email: 'orgteste@gmail.com',
			password: '123456'
		})).rejects.toBeInstanceOf(InvalidCredentialsError);
	});

	it('should not be able to authenticate with wrong password', async ()=>{
		await orgsRepository.create({
			author_name: 'OrgTest1',
			email: 'orgteste@gmail.com',
			whatsapp: '18449399',
			password: await hash('123456',6),
			cep: '12341-23',
			state: 'Sao pualo',
			city: 'Sao Paulo',
			neighborhood: 'teste',
			street: 'rua teste',
			latitude: 1231,
			longitude: 1234,
		});

		expect(async () =>
			await sut.execute({
				email: 'orgteste@gmail.com',
				password: '123123'
			})).rejects.toBeInstanceOf(InvalidCredentialsError);
	});
});
