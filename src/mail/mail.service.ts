import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sendgridMail from '@sendgrid/mail'
import { MailInput } from './mail.input';


@Injectable()
export class MailService {
    constructor(private readonly configService:ConfigService){
 
        sendgridMail.setApiKey('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')
    }

    async SendMail(input: MailInput){

        await sendgridMail.send({

            from: input.from,
            to: input.to,
            subject: input.subject,
            text:input.text,
            html: input.html
        })

    }
}
