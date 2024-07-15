import { Pet, Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import { findAllParams, PetsRepository } from '../pets-repository';
import { InMemoryOrgsRepository } from './in-memory-orgs-repository';

export class InMemoryPetsRepository implements PetsRepository {
	public items: Pet[] = [];

	constructor(private orgsRepository: InMemoryOrgsRepository) {}

	async create(data: Prisma.PetUncheckedCreateInput) {
		const pet = {
			id: randomUUID(),
			name: data.name,
			about: data.about,
			age: data.age,
			size: data.size,
			energy_level: data.energy_level,
			environment: data.environment, 
			race: data.race,
			org_id: data.org_id
		}; 
    
		this.items.push(pet);

		return pet;
	}
	
	async findById(id: string): Promise<Pet | null> {
		const pet = this.items.find(item =>{ if(item.id === id){
			console.log(item);
			return item;
		}});

		if(!pet)
			return null;

		return pet;
	}

	async findAll(params: findAllParams): Promise<Pet[]> {
		const orgsByCity = this.orgsRepository.items.filter(
			(org) => org.city === params.city,
		);

		const pets = this.items
			.filter((item) => orgsByCity.some((org) => org.id === item.org_id))
			.filter((item) => (params.age ? item.age === params.age : true))
			.filter((item) => (params.size ? item.size === params.size : true))
			.filter((item) =>
				params.energy_level ? item.energy_level === params.energy_level : true,
			)
			.filter((item) =>
				params.environment ? item.environment === params.environment : true,
			);

		return pets;
	}
	async delete(id: string) {
		for (let i = 0 ; i < this.items.length; i++) {
			if(this.items[i].id === id){
				const deletedPet = this.items.splice(i,i+1);
				return deletedPet[0];
			}
		}
		return null;
	}
}