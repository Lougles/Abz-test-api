import { Module } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '2400s' },
    }),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: '123123',
        signOptions: { expiresIn: '30d' },
      }),
    }),
    PassportModule.registerAsync({
      useFactory: () => ({
        defaultStrategy: 'jwt',
        property: 'user',
        session: false,
      }),
    }),
  ],
  providers: [JwtStrategy],
  exports: [JwtModule],
})
export class AuthModule {}
