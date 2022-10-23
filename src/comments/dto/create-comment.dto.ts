import {IsNotEmpty, IsString, ValidateIf} from "class-validator";

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  text: string;
  @IsNotEmpty()
  @IsString()
  author: string;
  @ValidateIf((o) => o.avatar)
  @IsString()
  avatar: string;
}
