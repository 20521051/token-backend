import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transfer, TransferDocument } from 'src/schemas/transfer.schema';

@Injectable()
export class TransferService {
  constructor(
    @InjectModel(Transfer.name) private transferModel: Model<TransferDocument>,
  ) {}

  async find(id: string): Promise<Transfer> {
    const transfer = await this.transferModel.findOne({ _id: id });
    if (transfer) {
      return {
        _id: transfer._id,
        from: transfer.from,
        to: transfer.to,
        value: transfer.value,
        at: transfer.at,
      };
    }
    return null;
  }
  
}
