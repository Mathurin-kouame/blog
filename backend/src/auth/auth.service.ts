import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(registerUserDto: RegisterUserDto) {
    const { firstName, lastName, email, password } = registerUserDto;

    // Vérifier l'email existe déjà
    const existingEmail = await this.userRepository.findOne({
      where: { email },
    });
    if (existingEmail)
      throw new NotFoundException({
        error: 'cet email existe déjà',
      });

    //hasher le password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Créer et sauvegarder le nouveau utilisateur
    const newUser = this.userRepository.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await this.userRepository.save(newUser);
    return { message: 'compte crée avec succès !!!' };
  }
}
