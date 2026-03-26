import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../common/prisma/prisma.service";
import { CreateTranslationKeyDto } from "./dto/create-translation-key.dto";
import { UpdateTranslationKeyDto } from "./dto/update-translation-key.dto";
import { UpsertTranslationDto } from "./dto/upsert-translation.dto";

@Injectable()
export class TranslationKeysService {
  constructor(private readonly prisma: PrismaService) {}

  findByProject(projectId: string) {
    return this.prisma.translationKey.findMany({
      where: { projectId },
      orderBy: [{ namespace: "asc" }, { key: "asc" }],
      include: {
        translations: true,
      },
    });
  }

  async findOne(id: string) {
    const key = await this.prisma.translationKey.findUnique({
      where: { id },
      include: { translations: true },
    });

    if (!key) {
      throw new NotFoundException(`Translation key ${id} not found`);
    }

    return key;
  }

  create(dto: CreateTranslationKeyDto) {
    return this.prisma.translationKey.create({
      data: dto,
    });
  }

  async update(id: string, dto: UpdateTranslationKeyDto) {
    await this.findOne(id);
    return this.prisma.translationKey.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.prisma.translation.deleteMany({
      where: { keyId: id },
    });

    await this.prisma.translationKey.delete({
      where: { id },
    });

    return { deleted: true };
  }

  async upsertTranslation(
    keyId: string,
    languageCode: string,
    dto: UpsertTranslationDto,
  ) {
    await this.findOne(keyId);

    return this.prisma.translation.upsert({
      where: {
        keyId_languageCode: {
          keyId,
          languageCode,
        },
      },
      create: {
        keyId,
        languageCode,
        value: dto.value,
      },
      update: {
        value: dto.value,
      },
    });
  }

  async removeTranslation(keyId: string, languageCode: string) {
    await this.findOne(keyId);

    await this.prisma.translation.deleteMany({
      where: {
        keyId,
        languageCode,
      },
    });

    return { deleted: true };
  }
}
