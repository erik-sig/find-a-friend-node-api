import { app } from '@/app';
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

		expect(profileResponse.statusCode).toEqual(200);
		expect(profileResponse.body.org).toEqual(expect.objectContaining({
			email: 'orgteste@gmail.com'
		}));
	});
});