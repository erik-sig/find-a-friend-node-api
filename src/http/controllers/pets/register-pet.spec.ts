import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Register pet (e2e)', ()=>{

	beforeAll(async ()=>{
		await app.ready();
	});

	afterAll(async ()=>{
		await app.close();
	});


	it('should be able to register a pet', async ()=>{
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

		const petResponse = await request(app.server).post('/pets').set('Authorization', `Bearer ${token}`).send(
			petDataTest
		);
		console.log(petResponse.body);
		expect(petResponse.statusCode).toEqual(201);
	});
});