import { faker } from "@faker-js/faker";

export interface User {
  userId: string;
  username: string;
  name: string;
  email: string;
  avatar: string;
  registeredAt: Date;
}

export function createRandomUser(): User {
  return {
    userId: faker.string.uuid(),
    username: faker.internet.userName(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    registeredAt: faker.date.past(),
  };
}

export const USERS: User[] = faker.helpers.multiple(createRandomUser, {
  count: 10,
});
