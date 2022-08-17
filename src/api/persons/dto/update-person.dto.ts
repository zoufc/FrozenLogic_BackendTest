import { IsNotEmpty, IsOptional } from 'class-validator';
import { CreatePersonDto } from './create-person.dto';

export class UpdatePersonDto {
  @IsNotEmpty()
  name: string;
  @IsOptional()
  parent: any;
  @IsOptional()
  children: any;
}
