import { IsNotEmpty } from 'class-validator';

export class CreatePersonDto {
  @IsNotEmpty()
  name: string;
  parent: any;
  children: any;
}
