import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async createToken() {
    //return this.jwtService.sign();
  }

  async checkToken(token: string) {
    // return this.jwtService.verify()
  }

  async login(email: string, senha: string) {
    const user = await this.prisma.users.findFirst({
      where: {
        email,
        senha,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email ou Senha incorreto');
    }
    return user;
  }
  async forget(email: string) {
    const user = await this.prisma.users.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email invalido');
    }
    //enviar o e-mail com processo de validação
    return true;
  }

  async reset(senha: string, token: string) {
    //validar o token e ai trocar a senha da pessoa
    const id = 0;
    await this.prisma.users.update({
      where: {
        id,
      },
      data: {
        senha,
      },
    });

    return true;
  }
}
