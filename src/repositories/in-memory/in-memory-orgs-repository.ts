import { Org, Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import { OrgsRepository } from '../orgs-repository';

export class InMemoryOrgsRepository implements OrgsRepository {
	public items: Org[] = [];

	async findByEmail(email: string) {
		const org = this.items.find(item => item.email === email);

		if(!org)
			return null;

		return org;
	}

	async create(data: Prisma.OrgCreateInput) {
		const org = {
			id: randomUUID(),
			author_name: data.author_name,
			email: data.email,
			whatsapp: data.whatsapp,
			password: data.password,
			cep: data.cep,
			state: data.state,
			city: data.city,
			neighborhood: data.neighborhood,
			street: data.street,
			latitude: new Prisma.Decimal(123),
			longitude: new Prisma.Decimal(213),
		}; 
    
		this.items.push(org);

		return org;
	}
	
	async findById(id: string): Promise<Org | null> {
		const org = this.items.find(item => item.id === id);

		if(!org)
			return null;

		return org;
	}
}