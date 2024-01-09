import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma, users } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async createToken(user: users) {
    return {
      accessToken: this.jwtService.sign(
        {
          id: user.id,
          nome: user.nome,
          email: user.email,
        },
        {
          expiresIn: '10 days',
          subject: String(user.id),
          issuer: 'login',
          audience: 'user',
        },
      ),
    };
  }

  async checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        audience: 'user',
        issuer: 'login',
      });
      return data;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async login(email: string, senha: string) {
    const user = await this.prisma.users.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email ou Senha incorreto');
    }

    //verifica se o hash é compativel com a senha
    if (!(await bcrypt.compare(senha, user.senha))) {
      throw new UnauthorizedException('Email ou Senha incorreto');
    }

    return this.createToken(user);
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
    const user = await this.prisma.users.update({
      where: {
        id,
      },
      data: {
        senha,
      },
    });

    return this.createToken(user);
  }

  async register(data: AuthRegisterDto) {
    const user = await this.userService.create(data);
    return this.createToken(user);
  }
}
