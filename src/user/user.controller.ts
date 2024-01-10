import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user..dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserService } from './user.service';
import { LogInterceptor } from 'src/interceptors/log.interceptor';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { RoleGuard } from 'src/guards/role.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { SkipThrottle, ThrottlerGuard } from '@nestjs/throttler';

//@UseInterceptors(LogInterceptor) //dessa forma colocamos o interceptador antes da controller , mas podemos usar ele  de modo global tambem
@UseGuards(AuthGuard, RoleGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @UseGuards(ThrottlerGuard) //ativando esse guard vamos proteger a rota de crete com as configs colocadas no app.module
  //esse guard limita o numero de conexões e acesso a uma rota
  @Post()
  async create(@Body() body: CreateUserDto) {
    return await this.userService.create(body);
  }

  //@SkipThrottle()//com esse comando a rota fica liberada das config que colocamos no app module
  @Roles(Role.Admin, Role.User) //regra de quem pode acessar a rota
  @Get()
  async read() {
    return this.userService.list();
  }

  @Get(':id')
  async readOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.show(id);
  }

  @Put(':id')
  async update(
    @Body() body: UpdateUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.userService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.delete(id);
  }
}
