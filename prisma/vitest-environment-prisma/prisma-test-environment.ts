import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

import { execSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { Environment } from 'vitest';

const prisma = new PrismaClient();
//"postgresql://docker:docker@localhost:5432/apifindafriend?schema=public"
function generateDatabaseURL(schema:string) {
	if(!process.env.DATABASE_URL){
		throw new Error('Pleasse provide a DATABASE_URL environment variable.');
	}

	const url = new URL(process.env.DATABASE_URL);

	url.searchParams.set('schema', schema);

	return url.toString();
}

export default<Environment> {
	name: 'prisma',
	transformMode: 'ssr',
	async setup() {
		const schema = randomUUID();
		const databaseURL = generateDatabaseURL(schema);
		
		process.env.DATABASE_URL = databaseURL;
		console.log(process.env.DATABASE_URL);
		execSync('npx prisma migrate deploy');

		return {
			async teardown() {
				await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);
				await prisma.$disconnect();
				console.log('Testes executados e banco encerrado');
			},
		
		};
	}
};