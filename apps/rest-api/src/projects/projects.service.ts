import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './entities/project.entity';
import { UpdateProjectDto } from './dto/update-project.dto.ts';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
  ) {}

  async findAll(page = 1, limit = 10): Promise<Project[]> {
    return this.projectRepo.find({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.projectRepo.findOne({ where: { id } });
    if (!project) throw new NotFoundException(`Project ${id} not found`);
    return project;
  }

  async create(dto: CreateProjectDto): Promise<Project> {
    const project = this.projectRepo.create({
      ...dto,
      constructionStartDate: new Date(dto.constructionStartDate),
      completionDate: new Date(dto.completionDate),
    });
    return this.projectRepo.save(project);
  }

  async update(id: string, dto: UpdateProjectDto): Promise<Project> {
    const project = await this.projectRepo.findOne({ where: { id } });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    // Apply only the fields provided
    const updated = this.projectRepo.merge(project, {
      ...dto,
      constructionStartDate: dto.constructionStartDate
        ? new Date(dto.constructionStartDate)
        : project.constructionStartDate,
      completionDate: dto.completionDate
        ? new Date(dto.completionDate)
        : project.completionDate,
    });

    return this.projectRepo.save(updated);
  }
}
