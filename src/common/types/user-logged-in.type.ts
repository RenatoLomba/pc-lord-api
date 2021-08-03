import { Role, User, UserRole } from '@prisma/client';

export type UserLoggedIn = User & {
  USER_ROLE: (UserRole & {
    ROLE: Role;
  })[];
};
