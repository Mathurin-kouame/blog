import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  // Inscription
  async createUser(registerUserDto: RegisterUserDto) {
    const { firstName, lastName, email, password } = registerUserDto;

    // Vérifier si l'email existe déjà
    const existingEmail = await this.userRepository.findOne({
      where: { email },
    });
    if (existingEmail)
      throw new ConflictException({
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

  //connexion
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (!existingUser)
      throw new UnauthorizedException({
        error: 'Mot de passe ou adresse email incorrect',
      });

    const isPasswordValid = await this.isPasswordValid(
      password,
      existingUser.password,
    );
    if (!isPasswordValid)
      throw new UnauthorizedException({
        error: 'Mot de passe ou Adresse email incorrect',
      });

    return this.authentificateUser(existingUser);
  }

  async getProfile(firstName: string) {
    const user = await this.userRepository.findOneBy({ firstName });
    if (!user) throw new NotFoundException('utilisateur non trouvé');

    return { firstName: user.firstName, userId: user.id };
  }

  //fonction pour verifier le mot de passe
  private async isPasswordValid(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  private async authentificateUser(user: UserEntity) {
    const payload = { sub: user.id, email: user.email };

    //sinAsync pour générer le token
    const token = await this.jwtService.signAsync(payload);
    return {
      access_token: token,
      type: 'Bearer',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
      },
    };
  }
}
