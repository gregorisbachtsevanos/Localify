import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../common/prisma/prisma.service";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.project.findMany({
      orderBy: { updatedAt: "desc" },
    });
  }

  async findOne(id: string) {
    const project = await this.prisma.project.findUnique({ where: { id } });
    if (!project) {
      throw new NotFoundException(`Project ${id} not found`);
    }
    return project;
  }

  create(dto: CreateProjectDto) {
    const languages = dto.languages.includes(dto.defaultLanguage)
      ? dto.languages
      : [dto.defaultLanguage, ...dto.languages];

    return this.prisma.project.create({
      data: {
        name: dto.name,
        description: dto.description,
        defaultLanguage: dto.defaultLanguage,
        languages,
      },
    });
  }

  async update(id: string, dto: UpdateProjectDto) {
    await this.findOne(id);

    const nextDefault = dto.defaultLanguage;
    const nextLanguages = dto.languages;

    if (nextDefault && nextLanguages && !nextLanguages.includes(nextDefault)) {
      dto.languages = [nextDefault, ...nextLanguages];
    }

    return this.prisma.project.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.prisma.translation.deleteMany({
      where: {
        key: {
          projectId: id,
        },
      },
    });

    await this.prisma.translationKey.deleteMany({
      where: { projectId: id },
    });

    await this.prisma.project.delete({ where: { id } });

    return { deleted: true };
  }
}
