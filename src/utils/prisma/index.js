import { PrismaClient as itemDataClient } from '../../../prisma/game/generated/itemDataClient/index.js';
import { PrismaClient as UserDataClient } from '../../../prisma/user/generated/UserDataClient/index.js';
export const itemDataClient = new itemDataClient({
  log: ['query', 'info', 'warn', 'error'],

  errorFormat: 'pretty',
});
export const userDataClient = new UserDataClient({
  log: ['info', 'warn', 'error'],

  errorFormat: 'pretty',
});
