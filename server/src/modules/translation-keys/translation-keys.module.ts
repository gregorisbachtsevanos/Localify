import { Module } from "@nestjs/common";
import { TranslationKeysController } from "./translation-keys.controller";
import { TranslationKeysService } from "./translation-keys.service";

@Module({
  controllers: [TranslationKeysController],
  providers: [TranslationKeysService],
})
export class TranslationKeysModule {}
