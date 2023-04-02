import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './schemas/user.schema';
import {MongooseModule} from '@nestjs/mongoose';
import { MailModule } from 'src/mail/mail.module';
import { ConfigService } from '@nestjs/config';


@Module({

    imports: [ MongooseModule.forFeature([{name:User.name, schema: UserSchema}]), MailModule],
    controllers: [UserController],
    providers: [ConfigService,UserService],
    exports:[UserService]
})

export class UserModule {}
