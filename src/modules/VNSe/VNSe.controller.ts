import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { VNSeService } from './VNSe.service';

@ApiTags('VNSe')
@Controller('vnse')
export class VNSeController {
  constructor(private readonly vnseService: VNSeService) {}

  @Get('/vnse')
  find(name: string) {
    return this.vnseService.find(name);
  }
}
