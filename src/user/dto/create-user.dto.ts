import { IsString, IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{4,20}$/, {
        message: 'Password too weak',
      })
    
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;


    @IsEmail()
    email: string;
}
