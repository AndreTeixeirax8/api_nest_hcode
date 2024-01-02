import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user..dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(body: CreateUserDto) {
    return await this.prismaService.users.create({
      data: body,
    });
  }
}
