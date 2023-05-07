import { IsString, IsEmail } from 'class-validator';

export class UserDto {
  @IsEmail()
  emailId: string;

  @IsString()
  password: string;

  @IsString()
  lastName: string;

  @IsString()
  firstName: string;

  @IsString()
  companyName: string;
}
