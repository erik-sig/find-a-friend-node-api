import { FastifyInstance } from 'fastify';
import request from 'supertest';

const dataTest = {
	author_name: 'OrgTest',
	email: 'orgteste@gmail.com',
	whatsapp: '18449399',
	password: '123456',
	cep: '12341-23',
	state: 'Sao paulo',
	city: 'Sao Paulo',
	neighborhood: 'teste',
	street: 'rua teste',
	latitude: 1231,
	longitude: 1234,
};

export async function createAndAuthenticateUser(app: FastifyInstance) {
	await request(app.server).post('/orgs').send(dataTest);

	const authResponse = await request(app.server).post('/sessions').send({
		email: 'orgteste@gmail.com',
		password: '123456'
	});

	const { token } = authResponse.body;

	return {token};
}
