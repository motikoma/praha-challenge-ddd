import { IsEmail, IsNotEmpty } from 'class-validator';
export class RequestBody {
  @IsNotEmpty()
  readonly lastName!: string;

  @IsNotEmpty()
  readonly firstName!: string;

  @IsNotEmpty()
  @IsEmail()
  readonly mailAddress!: string;
}
