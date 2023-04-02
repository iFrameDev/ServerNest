import { Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { BadRequestException } from '@nestjs/common';
import { MailService } from '../mail/mail.service'
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {

    constructor(
        
        @InjectModel(User.name)
        private userModel: Model<UserDocument>,
        private mailService: MailService,
        private configService:ConfigService 

    ){}

    async FindAll(): Promise <User[]>{

        const user = await this.userModel.find();
        return user;
    }
    async FindById(id:string): Promise<User>{
        const res = this.userModel.findById(id)
        return res;
    }

    async FindByName(name:string):Promise<User>{
        return await this.userModel.findOne({username: name})
    }

    async Create(user: User): Promise<User>{

        try{
                const username = await this.userModel.findOne({username: user.username})

                if(!username){

                    const email = await this.userModel.findOne({email: user.email})
                    if(!email){

                        const saltOrRounds = 10;
                        const hash = await bcrypt.hash(user.password, saltOrRounds);
                        user.password = hash;
                        const res = await this.userModel.create(user)
                        const html = '<p>test</p>'

                        await this.mailService.SendMail({
                            to: user.email,
                            from: this.configService.get<string>('SENDGRID_FROM_MAIL'),
                            subject:'confirm email',
                            text:'test',
                            html:html                            
                        })

                        return res;
                    }
                    throw new BadRequestException('email already exists');
                }
                
                throw new BadRequestException('Username already exists');

        }
        catch(e){

            console.log(e);
        }

        

    }
    async Delete(id:string): Promise<User>{
        return await this.userModel.findOneAndRemove({ _id: id });

    }
  


}
