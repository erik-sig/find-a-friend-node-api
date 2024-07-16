import { app } from '@/app';
import { prisma } from '@/lib/prisma';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';



describe('Delete pet (e2e)', ()=>{

	beforeAll(async ()=>{
		await app.ready();
	});

	afterAll(async ()=>{
		await app.close();
	});


	it('should be able to delete pet', async ()=>{
		const { token } = await createAndAuthenticateUser(app);
		const profileResponse = await request(app.server).get('/me').set('Authorization', `Bearer ${token}`).send();

		await prisma.pet.create({
			data:{	name: 'teste1',
				about: 'string',
				age: 'string',
				size: 'string',
				race: 'Bulldog',
				energy_level: 'Baixo',
				environment: 'string',
				org_id: profileResponse.body.org.id
			}
		});

		const createdPet2 = await prisma.pet.create({
			data:{	name: 'teste2',
				about: 'string',
				age: 'string',
				size: 'string',
				race: 'Bulldog',
				energy_level: 'Baixo',
				environment: 'string',
				org_id: profileResponse.body.org.id
			}
		});

		const petsFromOrg = await prisma.pet.findMany({
			where: {
				org_id: profileResponse.body.org.id
			}
		});
		expect(petsFromOrg).toHaveLength(2);
		const deletedPet = await request(app.server).delete(`/pets/${createdPet2.id}`).set('Authorization', `Bearer ${token}`).send();
		expect(deletedPet.statusCode).toEqual(200);
		const petsFromOrg2 = await prisma.pet.findMany({
			where: {
				org_id: profileResponse.body.org.id
			}
		});
		expect(petsFromOrg2).toHaveLength(1);
	});
});