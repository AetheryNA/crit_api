import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Users } from '../entities/user.entity';
import { genSalt, hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly entityManager: EntityManager) {}

  async registerUser(userParams: any): Promise<void> {
    const { userName, password, email, firstName, lastName } = userParams;
    const salt = await genSalt(5);
    const encryptedPassword = await hash(password, salt);

    const createNewUser = this.entityManager.create(Users, {
      userName: userName,
      password: encryptedPassword,
      email: email,
      firstName: firstName,
      lastName: lastName,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this.entityManager.save(createNewUser);
  }

  async findUser(loginParams: any): Promise<void> {
    const { email } = loginParams;

    const findUserByEmail: Users | any = await this.entityManager.findOneOrFail(
      Users,
      {
        where: { email: email },
      },
    );

    return findUserByEmail;
  }
}
