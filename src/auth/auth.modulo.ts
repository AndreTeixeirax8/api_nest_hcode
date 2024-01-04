import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'palavra_secreta',
    }),
  ],
})
export class AuthModule {}
