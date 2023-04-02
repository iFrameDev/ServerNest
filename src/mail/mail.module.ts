import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailService } from './mail.service';

@Module({
  providers: [ConfigService, MailService],
  exports:[MailService]
})
export class MailModule {}
