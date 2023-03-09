import { Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';



@Injectable()
export class UserService {

    constructor(
        
        @InjectModel(User.name)
        private userModel: Model<UserDocument>

    ){}

    async FindAll(): Promise <User[]>{

        const user = await this.userModel.find();
        return user;
    }
    async FindById(id:string): Promise<User>{
        const res = this.userModel.findById(id)
        return res;
    }

    async Create(user: User): Promise<User>{

        const username = await this.userModel.findOne({username: user.username})
        if(!username){

            const email = await this.userModel.findOne({email: user.email})
            if(!email){
                const res = await this.userModel.create(user)
                return res;
            }
            throw new Error('email already exists');
        }
        
        throw new Error('Username already exists');

    }
    async Delete(id:string): Promise<User>{
        return await this.userModel.findOneAndRemove({ _id: id });

    }
  


}
