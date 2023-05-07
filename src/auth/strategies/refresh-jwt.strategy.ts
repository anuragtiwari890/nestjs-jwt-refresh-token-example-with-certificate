import * as fs from 'fs';

import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, JwtFromRequestFunction, Strategy } from 'passport-jwt';
import { Request } from 'express';
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { User } from 'src/user/user';

const jwtFromRequest: JwtFromRequestFunction =
  ExtractJwt.fromAuthHeaderAsBearerToken();

export interface RefreshTokenSession {
  refreshToken: string;
  user: User;
  emailId: string;
}

// to keep the code simple, have not used dotenv config
const REFRESH_TOKEN_PUBLIC_KEY_PATH = 'keys/refresh-token-public.key';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest,
      secretOrKeyProvider: async (request, jwtToken, done) => {
        const publicKey = await fs.readFileSync(
          REFRESH_TOKEN_PUBLIC_KEY_PATH,
          'utf8',
        );
        return done(null, publicKey);
      },
      passReqToCallback: true,
    });
  }

  async validate(req: Request): Promise<RefreshTokenSession> {
    const refreshToken = req
      ?.get('authorization')
      ?.replace('Bearer', '')
      ?.trim();

    if (!refreshToken) {
      throw new ForbiddenException('token malformed');
    }

    const user = await this.authService.validateToken(refreshToken);

    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      refreshToken,
      user: user,
      emailId: user.emailId,
    };
  }
}
