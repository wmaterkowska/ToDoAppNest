import { IsNumberString } from 'class-validator';

export class FindEntityParamsDto {
  @IsNumberString()
  id: number;
}