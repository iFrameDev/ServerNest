import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/SocialLifeWebApp'),UserModule, AuthModule, MailModule],
  controllers: [AppController],
  providers: [AppService]

})
export class AppModule {}
