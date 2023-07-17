import * as fs from 'fs';

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshJwtStrategy } from './strategies/refresh-jwt.strategy';
import { UserTokenModule } from 'src/user-token/user-token.module';
import { AuthConfig } from 'src/config';

@Module({
  imports: [
    UserModule,
    UserTokenModule,
    JwtModule.registerAsync({
      useFactory: async () => {
        return {
          privateKey: await fs.readFileSync(AuthConfig.JWT_TOKEN_PRIVATE_KEY_PATH, 'utf8'),
        };
      },
    }),
  ],
  providers: [AuthService, JwtStrategy, RefreshJwtStrategy],
  controllers: [AuthController],
  exports: [JwtStrategy, RefreshJwtStrategy],
})
export class AuthModule {}
