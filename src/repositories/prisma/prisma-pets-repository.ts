import { prisma } from '@/lib/prisma';
import { Pet, Prisma } from '@prisma/client';
import { findAllParams, PetsRepository } from '../pets-repository';

export class PrismaPetsRepository implements PetsRepository {


	async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
		const pet = await prisma.pet.create({data});

		return pet;
	}
	async findById(id: string): Promise<Pet | null> {
		const pet = await prisma.pet.findFirst({
			where: {
				id
			}
		});

		return pet;
	}
	async findAll(params: findAllParams): Promise<Pet[]> {
		const pets = await prisma.pet.findMany({
			where: {
				age: params.age,
				size: params.size,
				energy_level: params.energy_level,
				environment: params.environment,
				race: params.race,
				org: {
					city: {
						contains: params.city
					}
				}
			}
		});
		return pets;
	}
	async delete(id: string){
		const pet = await prisma.pet.delete({
			where: {
				id
			}
		});

		return pet;
	}
}