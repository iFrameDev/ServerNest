import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Body, Post, UseGuards, Request } from '@nestjs/common/decorators';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDTO } from './dto/loginDto';
import { AuthGuard } from '@nestjs/passport';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() userDTO:CreateUserDto) : Promise<CreateUserDto>{
    return this.authService.ValidateRegister(userDTO);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async Login(@Request() req){
    
  
    return this.authService.login(req.user);

  }


}
