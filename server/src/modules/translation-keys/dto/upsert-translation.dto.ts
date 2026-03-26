import { IsString, MaxLength } from "class-validator";

export class UpsertTranslationDto {
  @IsString()
  @MaxLength(5000)
  value!: string;
}
