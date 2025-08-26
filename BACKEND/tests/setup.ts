import { execSync } from 'child_process';
import dotenv from 'dotenv';
import path from 'path';

export default async () => {
  console.log('Configuring test database...');
  dotenv.config({ path: path.resolve(__dirname, '..', '.env.test') });
  execSync('npx prisma generate && npx prisma migrate deploy');
  console.log('Test database configured successfully!');
};
