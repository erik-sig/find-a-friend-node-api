import { app } from '@/app';
import { prisma } from '@/lib/prisma';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';



describe('Get pet (e2e)', ()=>{

	beforeAll(async ()=>{
		await app.ready();
	});

	afterAll(async ()=>{
		await app.close();
	});


	it('should be able to get pet infos', async ()=>{
		const { token } = await createAndAuthenticateUser(app);
    
		const profileResponse = await request(app.server).get('/me').set('Authorization', `Bearer ${token}`).send();

		const petDataTest = {
			name:'dog',
			about:'Dog frances',
			age:'123',
			race: 'Bulldog',
			size:'Grande',
			energy_level:'safado',
			environment:'ambiente grande',
			org_id:profileResponse.body.org.id
		};

		const createdPet = await prisma.pet.create({
			data: petDataTest
		});

		const pet = await request(app.server).get(`/pets/${createdPet.id}`);

		expect(pet.statusCode).toEqual(200);
		expect(pet.body.pet).toEqual(expect.objectContaining({
			id: createdPet.id
		}));
	});
});