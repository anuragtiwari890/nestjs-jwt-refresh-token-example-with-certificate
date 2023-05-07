import { IsDateString, IsUUID } from 'class-validator';

export class UserTokenDto {
  @IsUUID()
  userId: string;

  @IsDateString()
  tokenLastUpdatedAt: Date;
}
