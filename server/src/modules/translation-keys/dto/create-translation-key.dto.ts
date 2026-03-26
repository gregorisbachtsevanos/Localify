import { IsOptional, IsString, MaxLength } from "class-validator";

export class CreateTranslationKeyDto {
  @IsString()
  projectId!: string;

  @IsString()
  @MaxLength(150)
  key!: string;

  @IsString()
  @MaxLength(80)
  namespace!: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;
}
