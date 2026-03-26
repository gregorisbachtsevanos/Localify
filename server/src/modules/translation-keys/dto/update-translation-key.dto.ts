import { IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateTranslationKeyDto {
  @IsOptional()
  @IsString()
  @MaxLength(150)
  key?: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  namespace?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;
}
