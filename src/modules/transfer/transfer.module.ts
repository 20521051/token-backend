import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TransferController } from './transfer.controller';
import { TransferService } from './transfer.service';


@Module({
  imports: [],
  controllers: [TransferController],
  providers: [PrismaService, TransferService],
  exports: [TransferService],
})
export class TransferModule {}
