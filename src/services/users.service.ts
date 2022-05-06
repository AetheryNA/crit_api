import { Injectable } from '@nestjs/common'
import { EntityManager } from 'typeorm';
import { Users } from '../entities/user.entity';
const bcrypt = require('bcrypt')

@Injectable()
export class UsersService {
  constructor(
    private readonly entityManager: EntityManager
  ){}

  async registerUser(userParams: any): Promise<void> {
    const {userName, password, email, firstName, lastName} = userParams
    const salt = await bcrypt.genSalt(5)
    const encryptedPassword = await bcrypt.hash(password, salt)

    const createNewUser = this.entityManager.create(Users, {
      userName: userName,
      password: encryptedPassword,
      email: email,
      firstName: firstName,
      lastName: lastName,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    await this.entityManager.save(createNewUser)
  }
}
