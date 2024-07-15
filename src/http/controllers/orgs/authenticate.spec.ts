import { app } from '@/app';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

const dataTest = {
	author_name: 'OrgTest123',
	email: 'orgteste123@gmail.com',
	whatsapp: '18449399',
	password: '123456',
	cep: '12341-23',
	state: 'Sao pualo',
	city: 'Sao Paulo',
	neighborhood: 'teste',
	street: 'rua teste',
	latitude: 1231,
	longitude: 1234,
};

describe('Authenticate (e2e)', ()=>{

	beforeAll(async ()=>{
		await app.ready();
	});

	afterAll(async ()=>{
		await app.close();
	});


	it('should be able to authenticate', async ()=>{
		await request(app.server).post('/orgs').send(dataTest);

		const response = await request(app.server).post('/sessions').send({
			email: 'orgteste123@gmail.com',
			password: '123456'
		});

		expect(response.statusCode).toEqual(200);
		expect(response.body).toEqual({
			token: expect.any(String)
		});
	});
});