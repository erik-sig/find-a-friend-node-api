import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Search for pets (e2e)', ()=>{

	beforeAll(async ()=>{
		await app.ready();
	});

	afterAll(async ()=>{
		await app.close();
	});


	it('should be able to get pets by filters', async ()=>{
		const { token } = await createAndAuthenticateUser(app);
    
		await request(app.server).post('/pets').set('Authorization', `Bearer ${token}`).send({
			name: 'teste1',
			about: 'string',
			age: 'string',
			size: 'string',
			race: 'Bulldog',
			energy_level: 'Alto',
			environment: 'string'
		});

		await request(app.server).post('/pets').set('Authorization', `Bearer ${token}`).send({
			name: 'teste1',
			about: 'string',
			age: 'string',
			size: 'string',
			race: 'Bulldog',
			energy_level: 'Baixo',
			environment: 'string'
		});

		await request(app.server).post('/pets').set('Authorization', `Bearer ${token}`).send({
			name: 'teste1',
			about: 'string',
			age: 'string',
			size: 'string',
			race: 'Bulldog',
			energy_level: 'Baixo',
			environment: 'string'
		});

		const queryPetsResponse = await request(app.server).get('/pets').query({
			city:'Sao Paulo',
			energy_level: 'Alto'
		}).send();

		expect(queryPetsResponse.statusCode).toEqual(200);
		expect(queryPetsResponse.body.pets).toHaveLength(1);
	});
});