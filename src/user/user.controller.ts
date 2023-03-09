import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {

    constructor(private userService: UserService){}

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
    async DeleteUser(
        @Param('id')
        id:string
    ): Promise<User>{
        return this.userService.Delete(id);
    }




}
