import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

import { MailService } from 'src/mail/mail.service';
import { ConfigService } from '@nestjs/config';

@Controller('user')
export class UserController {

    constructor(private userService: UserService,
        private mailService: MailService,
        private configService: ConfigService){}

    @Post('send-email')
    async sendEmail(@Query('email') email) {

        try{
        
            console.log('envoi en cours' + email)
            const res = await this.mailService.SendMail({
                                                        to: 'iframedev@gmail.com',
                                                        subject: 'Hello from sendgrid',
                                                        from: 'olvstudiolife@gmail.com',//this.configService.get<string>('SENDGRID_FROM_MAIL'), // Fill it with your validated email on SendGrid account
                                                        text: 'Hello',
                                                        html: '<h1>Hello</h1>'
            })
            return res;
        }
        catch(e){

            console.error(e)
        }

       
    }

    @Get()
    async GetAllUser(): Promise<User[]>{

        return this.userService.FindAll();
    }
    @Get(':id')
    async GetUserById(

        @Param('id')
        id:string

        ): Promise<User>{
        return this.userService.FindById(id);
    }

    @Post()
    async CreateUser(@Body() user:CreateUserDto): Promise<CreateUserDto>{

        return this.userService.Create(user)
    }

    @Delete(':id')
    async DeleteUser(@Param('id') id:string): Promise<User>{
        return this.userService.Delete(id);
    }




}
