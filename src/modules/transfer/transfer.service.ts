import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ResponseFailure } from 'src/utils/handle-response';
@Injectable()
export class TransferService {
  constructor(private prisma: PrismaService) {}

  async transfer(from: string, to: string, money: number) {
    try {
      const userFrom = await this.prisma.user.findUnique({
        where: { id: from },
      });
      if (userFrom) {
        return ResponseFailure({
          error: 'ERROR_USER_NOT_FOUND',
          statusCode: HttpStatus.CONFLICT,
        });
      }
      if (userFrom.money < money) {
        return ResponseFailure({
          error: 'ERROR_USER_NOT_ENOUGH_MONEY',
          statusCode: HttpStatus.CONFLICT,
        });
      }
      const userTo = await this.prisma.user.findUnique({ where: { id: to } });
      if (userTo) {
        return ResponseFailure({
          error: 'ERROR_USER_NOT_FOUND',
          statusCode: HttpStatus.CONFLICT,
        });
      }
      await this.prisma.user.update({
        where: { id: from },
        data: {
          money: userFrom.money - money,
        },
      });
      await this.prisma.user.update({
        where: { id: to },
        data: {
          money: userTo.money + money,
        },
      });
      await this.prisma.transfer.create({
        data: {
          from: from,
          to: to,
          money: money,
        },
      });
    } catch (error) {
      console.log('Error: ', error);
      return ResponseFailure({
        error: error.response?.error || 'ERROR_TRANSFER',
        statusCode: error.response?.statusCode || HttpStatus.BAD_REQUEST,
      });
    }
  }
  async receive(userId: string, money: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });
      if (user) {
        return ResponseFailure({
          error: 'ERROR_USER_NOT_FOUND',
          statusCode: HttpStatus.CONFLICT,
        });
      }
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          money: user.money + money,
        },
      });
      await this.prisma.transfer.create({
        data: {
          from: 'admin',
          to: userId,
          money: money,
        },
      });
    } catch (error) {
      console.log('Error: ', error);
      return ResponseFailure({
        error: error.response?.error || 'ERROR_RECEIVE',
        statusCode: error.response?.statusCode || HttpStatus.BAD_REQUEST,
      });
    }
  }
}
