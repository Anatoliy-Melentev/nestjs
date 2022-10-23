import { Comment } from "../../dto/comments.dto";
import { IsNotEmpty, IsString, ValidateIf } from "class-validator";

export class CreateDto {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsString()
  author: string;
  @ValidateIf((o) => o.description)
  @IsString()
  description!: string;
  @IsNotEmpty()
  @IsString()
  text: string;
  @ValidateIf((o) => o.comments)
  comments!: Comment[];
  @ValidateIf((o) => o.cover)
  @IsString()
  cover: string;
}
