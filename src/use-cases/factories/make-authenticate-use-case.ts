import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository';
import { AuthenticateUseCase } from '../authenticate';

export function makeAuthenticateOrgUseCase() {
	const orgsRepository = new PrismaOrgsRepository();
	const authenticateUseCase = new AuthenticateUseCase(orgsRepository);

	return authenticateUseCase;
}