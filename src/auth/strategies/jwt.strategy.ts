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

export interface TokenSession {
  token: string;
  user: User;
  emailId: string;
}

// to keep the code simple, have not used dotenv config
const JWT_PUBLIC_KEY_PATH = 'keys/jwt-token-public.key';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest,
      secretOrKeyProvider: async (request, jwtToken, done) => {
        const publicKey = await fs.readFileSync(JWT_PUBLIC_KEY_PATH, 'utf-8');
        return done(null, publicKey);
      },
      passReqToCallback: true,
    });
  }

  async validate(req: Request): Promise<TokenSession> {
    const token = req?.get('authorization')?.replace('Bearer', '')?.trim();

    if (!token) {
      throw new ForbiddenException('token malformed');
    }

    const user = await this.authService.validateToken(token);

    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      token,
      user: user,
      emailId: user.emailId,
    };
  }
}
