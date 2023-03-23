import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Body, Post } from '@nestjs/common/decorators';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginDTO } from './dto/loginDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() userDTO:CreateUserDto) : Promise<CreateUserDto>{
    return this.authService.ValidateRegister(userDTO);
  }

  @Post('login')
  async Login(@Body() userLogin : LoginDTO) : Promise<LoginDTO>{
    return this.authService.ValidateLogin(userLogin)
  }


}
