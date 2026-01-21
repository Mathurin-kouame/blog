import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RegisterUserDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from './decorators/user.decorator';

@UseGuards(AuthGuard('jwt'))
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async createUser(@Body() registerUserDto: RegisterUserDto) {
    const data = await this.authService.createUser(registerUserDto);
    return data;
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const data = await this.authService.login(loginDto);
    return data;
  }

  @Get('profile')
  async getProfile(@User('id') userId: string) {
    return this.authService.getProfile(userId);
  }
}
