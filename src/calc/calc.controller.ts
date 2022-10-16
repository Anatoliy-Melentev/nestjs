import { Controller, Put, Headers, Query } from '@nestjs/common';
import {CalcService} from "./calc.service";

@Controller('calc')
export class CalcController {
  constructor(private calcService: CalcService) {}

  @Put()
  async calculate(
    @Query('firstNum') firstNum: number,
    @Query('lastNum') lastNum: number,
    @Headers('Type-Operation') operation: string
  ): Promise<number | string> {
    console.log(firstNum, lastNum);
    if (operation && typeof operation === 'string') {
      if (['plus', 'minus', 'multiply', 'divide'].includes(operation)) {
        return this.calcService[operation](firstNum, lastNum);
      }

      return 'Не верный оператор';
    }

    return 'Не передан оператор';
  }
}
