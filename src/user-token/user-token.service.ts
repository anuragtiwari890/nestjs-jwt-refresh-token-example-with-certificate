import { v4 as uuid } from 'uuid';

import { Injectable } from '@nestjs/common';
import { UserTokenRepository } from './user-token.repository';
import { UserToken } from './user-token';
import { UserTokenDto } from './user-token.dto';

@Injectable()
export class UserTokenService {
  constructor(private readonly userTokenRepository: UserTokenRepository) {}

  async findByUserId(userId: string): Promise<UserToken | undefined> {
    return this.userTokenRepository.findByUserId(userId);
  }

  async upsertUserTokenByUserId(userTokenDto: UserTokenDto) {
    const userToken: UserToken = {
      id: uuid(),
      userId: userTokenDto.userId,
      tokenLastUpdatedAt: userTokenDto.tokenLastUpdatedAt,
    };

    return this.userTokenRepository.insertOrUpdateUserToken(userToken);
  }

  async getAllTokens() {
    return this.userTokenRepository.fetchAllTokens();
  }
}
