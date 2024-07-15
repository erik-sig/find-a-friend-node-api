
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository';
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository';
import { RegisterPetUseCase } from '../register-pets';

export function makeRegisterPetUseCase() {
	const petsRepository = new PrismaPetsRepository();
	const orgsRepository = new PrismaOrgsRepository();
	const registerPetUseCase = new RegisterPetUseCase(orgsRepository,petsRepository);

	return registerPetUseCase;
}