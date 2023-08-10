import { MongooseModule } from '@nestjs/mongoose';
import { Transfer, TransferSchema } from './../../schemas/transfer.schema';
import { Module } from '@nestjs/common';
import { TransferController } from './transfer.controller';
import { TransferService } from './transfer.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transfer.name, schema: TransferSchema },
    ]),
  ],
  controllers: [TransferController],
  providers: [TransferService],
  exports: [],
})
export class TransferModule {}
