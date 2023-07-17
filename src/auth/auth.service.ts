import * as fs from 'fs';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService, JwtModuleOptions } from '@nestjs/jwt';
import { User } from 'src/user/user';
import { AuthConfig } from 'src/config';
import { UserService } from 'src/user/user.service';
import { RefreshTokenSession } from './strategies/refresh-jwt.strategy';
import { UserTokenService } from 'src/user-token/user-token.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private userTokenService: UserTokenService,
  ) {}

  async signIn(
    emailId: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userService.findByemailId(emailId);

    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const tokens = await this.generateTokens(user);

    await this.setUserToken(user, tokens.accessToken);

    return tokens;
  }

  async generateNewRefreshToken(
    refreshTokenSession: RefreshTokenSession,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userService.findByUserId(
      refreshTokenSession.user.id,
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    const tokens = await this.generateTokens(user);
    await this.setUserToken(user, tokens.accessToken);

    return tokens;
  }

  async validateUser(payload: {
    sub: string;
    emailId: string;
  }): Promise<User> {
    const user = this.userService.findByUserId(payload.sub);
    return user;
  }

  async validateToken(refreshToken: string): Promise<User> {
    const decodedToken = this.decodeJwtToken(refreshToken);
    const user = await this.userService.findByUserId(decodedToken.acc);
    const userToken = await this.userTokenService.findByUserId(user.id);

    // This is to ensure that only the latest user token is validated
    if (
      !userToken ||
      new Date(decodedToken.iat * 1000).getTime() !==
        userToken.tokenLastUpdatedAt.getTime()
    ) {
      throw new UnauthorizedException();
    }
    return user;
  }

  private async setUserToken(user: User, accessToken: string) {
    const decodedToken = this.decodeJwtToken(accessToken);

    // To make sure thah only one userToken is present per user
    await this.userTokenService.upsertUserTokenByUserId({
      userId: user.id,
      tokenLastUpdatedAt: new Date(decodedToken.iat * 1000),
    });
  }

  private async generateTokens(
    user: User,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return {
      accessToken: await this.createJwtToken(user),
      refreshToken: await this.createJwtRefreshToken(user),
    };
  }

  private decodeJwtToken(encodedAccessToken: string): any {
    return this.jwtService.decode(encodedAccessToken);
  }

  private async createJwtToken(user: User): Promise<string> {
    const payload = {
      acc: user.id,
      emailId: user.emailId,
    };

    const iat = Math.ceil(Date.now() / 1000);
    return this.jwtService.signAsync(
      {
        ...payload,
        iat,
      },
      {
        algorithm: 'RS256',
        expiresIn: AuthConfig.LOGIN_TOKEN_EXPIRATION_TIME,
      },
    );
  }

  private async createJwtRefreshToken(user: User): Promise<string> {
    const payload = {
      acc: user.id,
      emailId: user.emailId,
    };

    const iat = Math.ceil(Date.now() / 1000);
    return this.jwtService.signAsync(
      {
        ...payload,
        iat,
      },
      {
        algorithm: 'RS256',
        expiresIn: AuthConfig.LOGIN_TOKEN_EXPIRATION_TIME,
        secret: fs.readFileSync(AuthConfig.JWT_REFRESH_TOKEN_PUBLIC_KEY_PATH, 'utf8'), // this should be cached
      },
    );
  }
}
