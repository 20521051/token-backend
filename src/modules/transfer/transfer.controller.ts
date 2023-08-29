import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TransferService } from './transfer.service';
import { TransferDTO } from './transfer.dto';

@ApiTags('Transfer')
@Controller('transfer')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Post('')
  transfer(@Body() data: TransferDTO) {
    return this.transferService.transfer(data.from, data.to, data.money);
  }

  @Post('/receive')
  receive(@Body() data: {id: string, money: number}) {
    return this.transferService.receive(data.id, data.money);
  }
}
