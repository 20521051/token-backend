import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TransferDTO {
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  from: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  to: string;

  @ApiPropertyOptional({
    type: Number,
  })
  @IsNotEmpty()
  @IsString()
  money: number;
}
