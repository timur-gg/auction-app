import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Body,
  ParseUUIDPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';

import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { GetProjectsDto } from './dto/get-projects.dto';
import { ProjectResponseDto } from './dto/get-project.response.dto';
import { plainToInstance } from 'class-transformer';

@ApiTags('Projects') // 🧠 Groups all endpoints under "Projects" in Swagger UI
@Controller('projects') // 🧠 All routes will be prefixed with /projects
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all projects with pagination' }) // 📘 Swagger route summary
  @ApiQuery({ name: 'page', required: false, type: Number }) // 📘 Document query params
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, type: [ProjectResponseDto] }) // 📘 Expected response
  @UsePipes(new ValidationPipe({ transform: true })) // ✅ Applies validation to query params
  async getProjects(@Query() query: GetProjectsDto) {
    const page = Number(query.page || 1);
    const limit = Number(query.limit || 10);
    const projects = await this.projectsService.findAll(page, limit);
    return plainToInstance(ProjectResponseDto, projects); // ✅ Map raw entities → clean response DTOs
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a project by ID' })
  @ApiParam({ name: 'id', type: String }) // 📘 Document route param
  @ApiResponse({ status: 200, type: ProjectResponseDto })
  async getProject(@Param('id', ParseUUIDPipe) id: string) {
    const project = await this.projectsService.findOne(id);
    return plainToInstance(ProjectResponseDto, project);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new project' })
  @ApiResponse({ status: 201, type: ProjectResponseDto })
  @UsePipes(new ValidationPipe({ whitelist: true })) // ✅ Enforces DTO schema (extra fields are stripped)
  async createProject(@Body() dto: CreateProjectDto) {
    const created = await this.projectsService.create(dto);
    return plainToInstance(ProjectResponseDto, created);
  }
}
