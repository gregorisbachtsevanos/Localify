import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { TranslationKeysService } from "./translation-keys.service";
import { CreateTranslationKeyDto } from "./dto/create-translation-key.dto";
import { UpdateTranslationKeyDto } from "./dto/update-translation-key.dto";
import { UpsertTranslationDto } from "./dto/upsert-translation.dto";

@Controller("translation-keys")
export class TranslationKeysController {
  constructor(
    private readonly translationKeysService: TranslationKeysService,
  ) {}

  @Get()
  findAll(@Query("projectId") projectId?: string) {
    if (projectId) {
      return this.translationKeysService.findByProject(projectId);
    }
    return [];
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.translationKeysService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateTranslationKeyDto) {
    return this.translationKeysService.create(dto);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateTranslationKeyDto) {
    return this.translationKeysService.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.translationKeysService.remove(id);
  }

  @Patch(":id/translations/:languageCode")
  upsertTranslation(
    @Param("id") keyId: string,
    @Param("languageCode") languageCode: string,
    @Body() dto: UpsertTranslationDto,
  ) {
    return this.translationKeysService.upsertTranslation(
      keyId,
      languageCode,
      dto,
    );
  }

  @Delete(":id/translations/:languageCode")
  removeTranslation(
    @Param("id") keyId: string,
    @Param("languageCode") languageCode: string,
  ) {
    return this.translationKeysService.removeTranslation(keyId, languageCode);
  }
}
