import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ResponseFailure, ResponseSuccess } from 'src/utils/handle-response';
import { CreateUserDTO, UserDTO } from './user.dto';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async get(userName: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { userName: userName },
      });
      if (!user) {
        return ResponseFailure({
          error: 'ERROR_USER_NOT_FOUND',
          statusCode: HttpStatus.CONFLICT,
        });
      }
      return user;
    } catch (error) {
      console.log('Error: ', error);
      return ResponseFailure({
        error: error.response?.error || 'ERROR_USER_NOT_FOUND',
        statusCode: error.response?.statusCode || HttpStatus.BAD_REQUEST,
      });
    }
  }

  async create(data: CreateUserDTO) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { userName: data.userName },
      });
      if (user) {
        return ResponseFailure({
          error: 'ERROR_USER_ALREADY_EXIST',
          statusCode: HttpStatus.CONFLICT,
        });
      }

      return ResponseSuccess({
        data: await this.prisma.user.create({
          data: data,
        }),
        message: 'CREATE_USER_SUCCESS',
      });
    } catch (error) {
      console.log('Error: ', error);
      return ResponseFailure({
        error: error.response?.error || 'ERROR_CREATE_USER',
        statusCode: error.response?.statusCode || HttpStatus.BAD_REQUEST,
      });
    }
  }

  async update(data: UserDTO) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { userName: data.userName },
      });
      if (!user) {
        return ResponseFailure({
          error: 'ERROR_USER_NOT_EXIST',
          statusCode: HttpStatus.CONFLICT,
        });
      }
      if (user.password !== data.password) {
        return ResponseFailure({
          error: 'ERROR_PASSWORD_INCORRECT',
          statusCode: HttpStatus.CONFLICT,
        });
      }

      return ResponseSuccess({
        data: await this.prisma.user.update({
          where: { userName: data.userName },
          data: data,
        }),
        message: 'UPDATE_USER_SUCCESS',
      });
    } catch (error) {
      console.log('Error: ', error);
      return ResponseFailure({
        error: error.response?.error || 'ERROR_UPDATE_USER',
        statusCode: error.response?.statusCode || HttpStatus.BAD_REQUEST,
      });
    }
  }

  async login(userName: string, password: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { userName: userName },
      });
      if (!user) {
        return ResponseFailure({
          error: 'ERROR_USER_NOT_FOUND',
          statusCode: HttpStatus.CONFLICT,
        });
      }
      if (user.password !== password) {
        return ResponseFailure({
          error: 'ERROR_PASSWORD_INCORRECT',
          statusCode: HttpStatus.CONFLICT,
        });
      }
      return ResponseSuccess({
        data: user,
        message: 'USER_LOGIN_SUCCESS',
      });
    } catch (error) {
      console.log('Error: ', error);
      return ResponseFailure({
        error: error.response?.error || 'ERROR_USER_LOGIN',
        statusCode: error.response?.statusCode || HttpStatus.BAD_REQUEST,
      });
    }
  }
}
