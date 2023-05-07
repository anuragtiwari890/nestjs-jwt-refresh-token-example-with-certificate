import { Module } from '@nestjs/common';
import { UserTokenService } from './user-token.service';
import { UserTokenRepository } from './user-token.repository';
import { UserTokenController } from './user-token.controller';

@Module({
  providers: [UserTokenService, UserTokenRepository],
  exports: [UserTokenService],
  controllers: [UserTokenController],
})
export class UserTokenModule {}
