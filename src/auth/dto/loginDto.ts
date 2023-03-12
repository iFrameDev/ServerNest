import { IsNotEmpty, IsString } from 'class-validator';


export class LoginDTO {


    @IsNotEmpty()
    @IsString()
    username:String;

    @IsNotEmpty()
    @IsString()
    password:String;


}