import { MongooseModule } from '@nestjs/mongoose';
import { VNSe, VNSeSchema } from './../../schemas/VNSe.schema';
import { Module } from '@nestjs/common';
import { VNSeController } from './VNSe.controller';
import { VNSeService } from './VNSe.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: VNSe.name, schema: VNSeSchema }]),
  ],
  controllers: [VNSeController],
  providers: [VNSeService],
  exports:[],
})
export class VNSeModule {}
