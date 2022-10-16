import { Injectable } from '@nestjs/common';

@Injectable()
export class CalcService {
  plus(firstNum: number, lastNum: number): number {
    return firstNum + lastNum;
  }
  minus(firstNum: number, lastNum: number): number {
    return firstNum - lastNum;
  }
  multiply(firstNum: number, lastNum: number): number {
    return firstNum * lastNum;
  }
  divide(firstNum: number, lastNum: number): number {
    return firstNum / lastNum;
  }
}
