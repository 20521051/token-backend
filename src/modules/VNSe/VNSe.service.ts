import { VNSe, VNSeDocument } from './../../schemas/VNSe.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class VNSeService {
  constructor(@InjectModel(VNSe.name) private VNSeModel: Model<VNSeDocument>) {}

  async find(name: string): Promise<VNSe> {
    const VNSe = await this.VNSeModel.findOne({ name: name });
    if (VNSe) {
      return {
        _id: VNSe._id,
        name: VNSe.name,
        thumbnail: VNSe.thumbnail,
        price: VNSe.price,
      };
    }
    return null;
  }
  async setPrice(name: string, price: number): Promise<VNSe> {
    const VNSe = await this.VNSeModel.findOneAndUpdate(
      { name: name },
      { price: price },
    );
    if (VNSe) {
      return {
        _id: VNSe._id,
        name: VNSe.name,
        thumbnail: VNSe.thumbnail,
        price: VNSe.price,
      };
    }
    return null;
  }
}
