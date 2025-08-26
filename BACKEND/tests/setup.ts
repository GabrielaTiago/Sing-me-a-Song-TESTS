import { execSync } from 'child_process';

export default async () => {
  console.log('Configuring test database...');
  execSync('npx prisma generate && npx prisma migrate deploy');
  console.log('Test database configured successfully!');
};
