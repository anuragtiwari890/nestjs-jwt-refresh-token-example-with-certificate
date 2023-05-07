import { IsString, IsEmail } from 'class-validator';

export class UserDto {
  @IsEmail()
  emailId: string;

  @IsString()
  password: string;

  @IsString()
  lastName: string;

  @IsString()
  firtName: string;

  @IsString()
  companyName: string;
}
