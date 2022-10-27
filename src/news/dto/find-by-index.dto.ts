import { IsNotEmpty, IsNumberString } from 'class-validator';

export class FindByIndexDto {
  //@IsNumberString()
  //@IsNotEmpty()
  id: number;
}
