import { User, UserDocument } from './../../schemas/User.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Web3 } from 'Web3';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

  async find(id: string): Promise<User> {
    const user = await this.UserModel.findOne({ _id: id });
    if (user) {
      return {
        _id: user._id,
        address: user.address,
      };
    }
    return null;
  }

  async signIn(): Promise<User> {
    // connect wallet
    return null;
  }
}
