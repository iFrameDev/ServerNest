import { Injectable, HttpException, HttpStatus, } from '@nestjs/common';

import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { LoginDTO } from './dto/loginDto';


@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService) {}

    async ValidateRegister(user : CreateUserDto): Promise<CreateUserDto>{
        return this.userService.Create(user);
    }

    async ValidateLogin(userLogin : LoginDTO): Promise<any>{

        const user = await this.userService.FindByName(userLogin.username)
        if(user){
            if(userLogin.password == user.password){
                return 'connexion reussi'
            }
            throw new HttpException('Invalid Credential', HttpStatus.UNAUTHORIZED);

        }
        throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

}
