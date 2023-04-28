import { Injectable, HttpException, HttpStatus, } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { LoginDTO } from './dto/loginDto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

    constructor(
                    private readonly userService: UserService,
                    private jwtService: JwtService
    ) {}

    async ValidateRegister(user : CreateUserDto): Promise<CreateUserDto>{
        return this.userService.Create(user);
    }

    async signIn(userLogin : LoginDTO): Promise<any>{

        const user = await this.userService.FindByName(userLogin.username)
        if(user){

            const isMatch = await bcrypt.compare(userLogin.password, user.password);
            if(isMatch){


                return user;
            }
            throw new HttpException('Invalid Credential', HttpStatus.UNAUTHORIZED);

        }
        throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    
    async login(user: any) {
        const payload = { username: user.username, sub: user._id };
        return {                
          access_token: this.jwtService.sign(payload)
        };
      }



}
