import { Injectable } from '@nestjs/common';
import { UserToken } from './user-token';

@Injectable()
export class UserTokenRepository {
  userTokens: UserToken[] = [];

  insertOrUpdateUserToken(userToken: UserToken) {
    const alreadyPresentUserToken = this.findByUserId(userToken.userId);

    if (alreadyPresentUserToken) {
      alreadyPresentUserToken.tokenLastUpdatedAt = userToken.tokenLastUpdatedAt;
      userToken = alreadyPresentUserToken;
    } else {
      this.userTokens.push(userToken);
    }
    return userToken;
  }

  findByUserId(userId: string) {
    return this.userTokens.filter((it) => it.userId === userId)[0];
  }

  fetchAllTokens() {
    return this.userTokens;
  }
}
