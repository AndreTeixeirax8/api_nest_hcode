import {
  Body,
  Controller,
  Post,
  Headers,
  UseGuards,
  Req,
  Request,
} from '@nestjs/common';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthForgetDto } from './dto/auth-forget.dto';
import { AuthResetDto } from './dto/auth-reset.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() body: AuthLoginDto) {
    return this.authService.login(body.email, body.senha);
  }

  @Post('register')
  async register(@Body() body: AuthRegisterDto) {
    return this.authService.register(body);
  }

  @Post('forget')
  async forget(@Body() body: AuthForgetDto) {
    return this.authService.forget(body.email);
  }

  @Post('reset')
  async reset(@Body() body: AuthResetDto) {
    return this.authService.reset(body.senha, body.token);
  }

  @UseGuards(AuthGuard)
  @Post('me')
  async me(@User() user) {
    //const tokenPayload = await req.tokenPayload; // Espera a resolução da Promise
    return { user };
  }
}
