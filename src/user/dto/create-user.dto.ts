import { IsString, IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).+$/, {
        message: 'Password too weak',
      })
    
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;


    @IsEmail()
    email: string;
}
