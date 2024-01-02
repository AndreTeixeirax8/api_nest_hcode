import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user..dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(body: CreateUserDto) {
    if (!body.birthAt) {
      body.birthAt = null;
    } else {
      let dataNascimento = new Date(body.birthAt);
      body.birthAt = dataNascimento;
    }

    return await this.prismaService.users.create({
      data: body,
    });
  }

  async list() {
    return this.prismaService.users.findMany();
  }

  async show(id: number) {
    return this.prismaService.users.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: UpdateUserDto) {
    if (!data.birthAt) {
      data.birthAt = null;
    } else {
      let dataNascimento = new Date(data.birthAt);
      data.birthAt = dataNascimento;
    }

    return await this.prismaService.users.update({
      data: data,
      where: { id },
    });
  }

  async delete(id: number) {
    if (!(await this.show(id))) {
      throw new NotFoundException('Usuario não encotrado');
    }
    return this.prismaService.users.delete({
      where: { id },
    });
  }
}
