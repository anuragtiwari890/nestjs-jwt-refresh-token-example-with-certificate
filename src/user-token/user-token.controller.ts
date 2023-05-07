import { Controller, Get } from '@nestjs/common';
import { UserToken } from './user-token';
import { UserTokenService } from './user-token.service';

@Controller('userToken')
export class UserTokenController {
  constructor(private readonly userTokenService: UserTokenService) {}

  @Get('listAll')
  async listAll(): Promise<UserToken[]> {
    return await this.userTokenService.getAllTokens();
  }
}
