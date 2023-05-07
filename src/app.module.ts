import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UserTokenModule } from './user-token/user-token.module';

@Module({
  imports: [AuthModule, UserModule, UserTokenModule],
  providers: [],
})
export class AppModule {}
