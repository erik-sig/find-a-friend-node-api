import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository';
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { SearchPetUseCase } from './search-pets';

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
let sut: SearchPetUseCase;

describe('Search Pets Use Case', ()=>{

	beforeEach(()=>{
		orgsRepository = new InMemoryOrgsRepository();
		petsRepository = new InMemoryPetsRepository(orgsRepository);
		sut = new SearchPetUseCase(petsRepository);
	});
	
	it('should be able to search for pets by city', async ()=>{
		const org = await orgsRepository.create(	{author_name: 'teste7',
			email: 'teste7@gmail.com',
			whatsapp: '17996704',
			password: '123456',
			cep:' 123123',
			state: 'z.strin',
			city: 'SAO PAULO',
			neighborhood: 'z.string()',
			street: 'z.string()',
			latitude: 123,
			longitude: 231
		});

		const org2 = await orgsRepository.create({
			author_name: 'teste8',
			email: 'teste8@gmail.com',
			whatsapp: '17996704',
			password: '123456',
			cep:' 123123',
			state: 'z.strin',
			city: 'SANTA CATARINA',
			neighborhood: 'z.string()',
			street: 'z.string()',
			latitude: 123,
			longitude: 231
		});

		await petsRepository.create({...dataTest, org_id: org.id});
		await petsRepository.create({...dataTest, org_id: org.id});

		await petsRepository.create({...dataTest, org_id: org2.id});

		const { pets } = await sut.execute({
			age:'123',
			size:'Grande',
			energy_level:'safado',
			environment:'ambiente grande',
			city: 'SAO PAULO', 
		});
		expect(pets).toHaveLength(2);

		const { pets: pets2 } = await sut.execute({
			age:'123',
			size:'Grande',
			energy_level:'safado',
			environment:'ambiente grande',
			city: 'SANTA CATARINA', 
		});
		expect(pets2).toHaveLength(1);
	});

	it('should be able to search for pets by city and energy-level', async ()=>{
		const org = await orgsRepository.create(	{author_name: 'teste7',
			email: 'teste7@gmail.com',
			whatsapp: '17996704',
			password: '123456',
			cep:' 123123',
			state: 'z.strin',
			city: 'SAO PAULO',
			neighborhood: 'z.string()',
			street: 'z.string()',
			latitude: 123,
			longitude: 231
		});

		await petsRepository.create({...dataTest, org_id: org.id, energy_level:'safado'});
		await petsRepository.create({...dataTest, org_id: org.id, energy_level:'aaaa',});

		const { pets:petsSuccess } = await sut.execute({
			
			energy_level:'safado',
			environment:'ambiente grande',
			city: 'SAO PAULO', 
		});
	
		const { pets: petsError } = await sut.execute({
			age:'1222',
			size:'Grande',
			energy_level:'safado',
			environment:'ambiente grande',
			city: 'aaaa', 
		});

		expect(petsSuccess).toHaveLength(1);
		expect(petsError).toHaveLength(0);
	});
	
	it('should be able to search for pets by city and size', async ()=>{
		const org = await orgsRepository.create(	{author_name: 'teste7',
			email: 'teste7@gmail.com',
			whatsapp: '17996704',
			password: '123456',
			cep:' 123123',
			state: 'z.strin',
			city: 'SAO PAULO',
			neighborhood: 'z.string()',
			street: 'z.string()',
			latitude: 123,
			longitude: 231
		});

		await petsRepository.create({...dataTest, org_id: org.id, size:'gigabiga'});
		await petsRepository.create({...dataTest, org_id: org.id, size:'aaaa',});

		const { pets:petsSuccess } = await sut.execute({
			size:'gigabiga',
			city: 'SAO PAULO', 
		});
	
		const { pets: petsError } = await sut.execute({
			size:'naaaaaa',
			city: 'SAO PAULO', 
		});

		expect(petsSuccess).toHaveLength(1);
		expect(petsError).toHaveLength(0);
	});

	it('should be able to search for pets by city and environment', async ()=>{
		const org = await orgsRepository.create(	{author_name: 'teste7',
			email: 'teste7@gmail.com',
			whatsapp: '17996704',
			password: '123456',
			cep:' 123123',
			state: 'z.strin',
			city: 'SAO PAULO',
			neighborhood: 'z.string()',
			street: 'z.string()',
			latitude: 123,
			longitude: 231
		});

		await petsRepository.create({...dataTest, org_id: org.id, environment:'ambiente amplo'});
		await petsRepository.create({...dataTest, org_id: org.id, environment:'aaaa',});

		const { pets:petsSuccess } = await sut.execute({
			environment:'ambiente amplo',
			city: 'SAO PAULO', 
		});
	
		const { pets: petsError } = await sut.execute({
			environment:'sssssssssss',
			city: 'SAO PAULO', 
		});

		expect(petsSuccess).toHaveLength(1);
		expect(petsError).toHaveLength(0);
	});
	
	it('should be able to search for pets by city and age', async ()=>{
		const org = await orgsRepository.create(	{author_name: 'teste7',
			email: 'teste7@gmail.com',
			whatsapp: '17996704',
			password: '123456',
			cep:' 123123',
			state: 'z.strin',
			city: 'SAO PAULO',
			neighborhood: 'z.string()',
			street: 'z.string()',
			latitude: 123,
			longitude: 231
		});

		await petsRepository.create({...dataTest, org_id: org.id, age:'12'});
		await petsRepository.create({...dataTest, org_id: org.id, age:'132',});

		const { pets:petsSuccess } = await sut.execute({
			age:'12',
			city: 'SAO PAULO', 
		});
	
		const { pets: petsError } = await sut.execute({
			age:'122222',
			city: 'SAO PAULO', 
		});

		expect(petsSuccess).toHaveLength(1);
		expect(petsError).toHaveLength(0);
	});

	it('should be able to search for pets by city and age and environment', async ()=>{
		const org = await orgsRepository.create(	{author_name: 'teste7',
			email: 'teste7@gmail.com',
			whatsapp: '17996704',
			password: '123456',
			cep:' 123123',
			state: 'z.strin',
			city: 'SAO PAULO',
			neighborhood: 'z.string()',
			street: 'z.string()',
			latitude: 123,
			longitude: 231
		});

		await petsRepository.create({...dataTest, org_id: org.id, age:'12', environment:'ambiente amplo'});
		await petsRepository.create({...dataTest, org_id: org.id, age:'132', environment:'dfdfdfdf'});

		const { pets:petsSuccess } = await sut.execute({
			age:'12',
			environment:'ambiente amplo',
			city: 'SAO PAULO', 
		});
	
		const { pets: petsError } = await sut.execute({
			age:'122222',
			environment:'sssssssss',
			city: 'SAO PAULO', 
		});
		const { pets:petsError2 } = await sut.execute({
			age:'12',
			environment:'ambiente pequeno',
			city: 'SAO PAULO', 
		});

		expect(petsSuccess).toHaveLength(1);
		expect(petsSuccess).toEqual(
			[expect.objectContaining({
				age:'12',
				environment:'ambiente amplo',
			}
			)]);

		expect(petsError).toHaveLength(0);
		expect(petsError2).toHaveLength(0);
	});
});
