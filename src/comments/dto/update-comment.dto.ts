import { IsNotEmpty, IsString, ValidateIf } from "class-validator";

export class UpdateCommentDto {
  @IsNotEmpty()
  @IsString()
  text: string;
  @IsNotEmpty()
  @IsString()
  author: string;
  @IsString()
  @ValidateIf((o) => o.avatar)
  avatar!: string;
}
